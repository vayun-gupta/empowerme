from typing import List, Dict, Any

def get_all_scenarios() -> List[Dict[str, Any]]:
    # Future logic for pulling scenarios from database goes here
    # For now, return a placeholder list
    return [
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
