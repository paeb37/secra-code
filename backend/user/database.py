'''
ACTIONS CONCERNING THE MYSQL DATABASE
(e.g. connecting to it, making queries)
'''

from sshtunnel import SSHTunnelForwarder 
import sqlalchemy
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, text
import awswrangler 
import os
from dotenv import load_dotenv, find_dotenv
import paramiko

load_dotenv(find_dotenv())

# Doing it the awswrangler/sqlalchemy way 

engine = None # use this to make SQL queries later

# backend directory location (MAY NEED LATER)
# current_dir_path = os.path.dirname(os.path.abspath(__file__))
# pem_key_path = os.path.join(current_dir_path, "mysql.pem") # not exactly sure how this is working?
# print(pem_key_path)

AWS_IP = os.getenv('AWS_IP')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')
SSH_PRIVATE_KEY_PASSWORD = os.getenv('SSH_PRIVATE_KEY_PASSWORD')

''' FOR DEBUGGING ONLY '''
# print(AWS_IP)
# print(DATABASE_PASSWORD)

# REMOTE_BIND_ADDRESS = 'ec2-18-220-201-181.us-east-2.compute.amazonaws.com'

# ssh tunnel closes at the end of the method (so we need to reconnect each time we make a query...)
# example query: "select * from USERS"
def make_query(query):
    global engine # to indicate we want to change the global var and not make a local copy with same name

    with SSHTunnelForwarder( 
        # NEED TO REPLACE EACH TIME WITH THE NEW IP OF DATABASE (in ENV file) #

        (AWS_IP, 22), # 22 by default
        ssh_username='ec2-user', 
        # ssh_pkey=pem_key_path, # not sure if absolute is necessary
        # I think it uses the pem key in the .ssh folder by default so this doesn't matter
        # ssh_private_key_password=SSH_PRIVATE_KEY_PASSWORD,
        remote_bind_address=('127.0.0.1', 3306) # port 3306 is default for mySQL

    ) as server: 
        try: 
            print("****SSH Tunnel Established****")   

            # server.start() # start ssh server

            conf ={
                'host': '127.0.0.1', # local because 
                'port': str(server.local_bind_port), # '3306',
                'database': "SECRA", # might need to change this
                'user': "root",
                'password': DATABASE_PASSWORD
            }

            # might need this instead
            # local_port = str(server.local_bind_port)

            engine = create_engine("mysql+pymysql://{user}:{password}@{host}:{port}/{database}".format(**conf))
            # engine.dispose() 

            with engine.connect() as connection:
                rows = connection.execute(text(query)) # need to wrap string in text
                # print(rows)

                return rows
            
                for row in rows:
                    print(row)

        except Exception as e:
            print(e)

# make_query("SELECT * FROM USERS")