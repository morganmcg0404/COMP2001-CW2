import pyodbc
import time

def get_connection():
    connection_string = (
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=DIST-6-505.uopnet.plymouth.ac.uk;"
        "DATABASE=COMP2001_MMcGovern;"
        "UID=MMcGovern;"
        "PWD=DlgB377*"
    )
    
    retries = 5
    for i in range(retries):
        try:
            return pyodbc.connect(connection_string)
        except pyodbc.Error as e:
            print(f"Database connection failed: {e}")
            if i < retries - 1:
                print("Retrying...")
                time.sleep(10)
            else:
                raise e