from psycopg2 import connect

def create_conn():
    """get connection from envrionment variable by the conn factory

    Returns:
        [type]: the psycopg2's connection object
    """
    import os
    env = os.environ
    params = {
        'database': env.get('OG_DATABASE', 'GaussChat'),
        'user': env.get('OG_USER', 'gaussdb'),
        'password': env.get('OG_PASSWORD', 'Db@00001'),
        'host': env.get('OG_HOST', '127.0.0.1'),
        'port': env.get('OG_PORT', 15432)
    }
    conn = connect(**params)
    return conn

conn = create_conn()