from sqlalchemy.orm import Session
from app.models.scenario import ScenarioDB


def get_all_scenarios(db: Session):
    return db.query(ScenarioDB).all()


def get_scenario_by_id(db: Session, scenario_id: int):
    return db.query(ScenarioDB).filter(ScenarioDB.scenario_id == scenario_id).first()
