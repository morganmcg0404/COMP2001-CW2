from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database import get_connection

class TrailUpdate(BaseModel):
    trail_name: str
    trail_length: float

class PointUpdate(BaseModel):
    trail_id: int
    latitude: float
    longitude: float
    elevation: float

trail_router = APIRouter()

@trail_router.get("/{table}")
def get_all_records(table: str):
    conn = get_connection()
    cursor = conn.cursor()
    if table == 'trail':
        cursor.execute("SELECT id, trail_name, trail_length FROM CW2.trail")
    elif table == 'points':
        cursor.execute("SELECT id, trail_id, latitude, longitude, elevation FROM CW2.points")
    else:
        raise HTTPException(status_code=400, detail="Invalid table name")
    columns = [column[0] for column in cursor.description]
    records = cursor.fetchall()
    return [dict(zip(columns, row)) for row in records]

@trail_router.get("/trail/{trail_id}")
def get_trail(trail_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, trail_name, trail_length FROM CW2.trail WHERE id = ?", (trail_id,))
    trail = cursor.fetchone()
    if not trail:
        raise HTTPException(status_code=404, detail="Trail not found")
    columns = [column[0] for column in cursor.description]
    return dict(zip(columns, trail))

@trail_router.post("/{table}")
def create_record(table: str, record: dict):
    conn = get_connection()
    cursor = conn.cursor()
    if table == 'trail':
        cursor.execute("INSERT INTO CW2.trail (trail_name, trail_length) VALUES (?, ?)",
                       (record['trail_name'], record['trail_length']))
    elif table == 'points':
        cursor.execute("INSERT INTO CW2.points (trail_id, latitude, longitude, elevation) VALUES (?, ?, ?, ?)",
                       (record['trail_id'], record['latitude'], record['longitude'], record['elevation']))
    conn.commit()
    return {"message": "Record created successfully"}

@trail_router.put("/{table}/{record_id}")
def update_record(table: str, record_id: int, record: dict):
    conn = get_connection()
    cursor = conn.cursor()
    if table == 'trail':
        cursor.execute("UPDATE CW2.trail SET trail_name = ?, trail_length = ? WHERE id = ?",
                       (record['trail_name'], record['trail_length'], record_id))
    elif table == 'points':
        cursor.execute("UPDATE CW2.points SET trail_id = ?, latitude = ?, longitude = ?, elevation = ? WHERE id = ?",
                       (record['trail_id'], record['latitude'], record['longitude'], record['elevation'], record_id))
    conn.commit()
    return {"message": "Record updated successfully"}

@trail_router.delete("/{table}/{record_id}")
def delete_record(table: str, record_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(f"DELETE FROM CW2.{table} WHERE id = ?", (record_id,))
    conn.commit()
    return {"message": "Record deleted successfully"}