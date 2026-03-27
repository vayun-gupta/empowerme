from fastapi import APIRouter

router = APIRouter(prefix="/scenarios", tags=["Scenarios"])

@router.get("/")
def get_scenarios():
    scenarios = [
        {
            "id": 1,
            "title": "Performance Review Bias",
            "context": "You are discussing promotion readiness with a senior faculty member."
        },
        {
            "id": 2,
            "title": "Idea Ignored in Meeting",
            "context": "Your idea was ignored until repeated by a male colleague."
        }
    ]
    return scenarios
