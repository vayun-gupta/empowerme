"""
Route reachability and integration tests for POST /api/adversary/

Run from backend/:
    pytest tests/test_adversary_route.py -v

For the live Gemini test:
    GEMINI_API_KEY=<key> pytest tests/test_adversary_route.py -v -m live
"""

import os
from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

MINIMAL_PAYLOAD = {
    "session_id": 9999,
    "scenario_id": 1,
    "user_message": "I have exceeded every KPI this quarter.",
    "conversation_history": [],
}


# ── Stage 1: route reachability (no DB, no Gemini) ───────────────────────────

def test_adversary_route_is_reachable_with_mocked_service():
    """Confirms the route exists and returns 201 when the service succeeds."""
    mock_response = MagicMock()
    mock_response.adversary_message = "Thank you for sharing that."
    mock_response.session_id = 9999
    mock_response.message_id = 1

    with patch(
        "app.routes.adversary.generate_adversary_response",
        return_value=mock_response,
    ):
        resp = client.post("/api/adversary/", json=MINIMAL_PAYLOAD)

    assert resp.status_code == 201, resp.text
    body = resp.json()
    assert "adversary_message" in body
    assert body["session_id"] == 9999


def test_adversary_route_returns_404_for_missing_scenario():
    """Confirms ValueError('Scenario X not found') maps to 404."""
    with patch(
        "app.routes.adversary.generate_adversary_response",
        side_effect=ValueError("Scenario 999 not found"),
    ):
        resp = client.post("/api/adversary/", json={**MINIMAL_PAYLOAD, "scenario_id": 999})

    assert resp.status_code == 404
    assert "not found" in resp.json()["detail"].lower()


def test_adversary_route_returns_500_on_unexpected_error():
    """Confirms unhandled exceptions map to 500 with a detail message."""
    with patch(
        "app.routes.adversary.generate_adversary_response",
        side_effect=RuntimeError("something exploded"),
    ):
        resp = client.post("/api/adversary/", json=MINIMAL_PAYLOAD)

    assert resp.status_code == 500
    assert "Adversary generation failed" in resp.json()["detail"]


def test_adversary_route_rejects_missing_fields():
    """Pydantic should reject a payload missing required fields with 422."""
    resp = client.post("/api/adversary/", json={"session_id": 9999})
    assert resp.status_code == 422


# ── Stage 2: live Gemini call (requires GEMINI_API_KEY + running DB) ─────────

@pytest.mark.live
def test_adversary_live_gemini_call():
    """
    Hits the real endpoint end-to-end.
    Requires: GEMINI_API_KEY set, backend seeded (scenario_id=1 must exist).
    """
    if not os.environ.get("GEMINI_API_KEY"):
        pytest.skip("GEMINI_API_KEY not set")

    resp = client.post("/api/adversary/", json=MINIMAL_PAYLOAD)
    assert resp.status_code == 201, resp.text
    body = resp.json()
    assert "adversary_message" in body
    assert len(body["adversary_message"]) > 10
