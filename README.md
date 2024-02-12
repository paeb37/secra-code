# secra-code

*Setup Instructions*

Step 1 - Installations:

conda create --name secra
##
conda activate secra

pip3 install flask 
##
pip3 install flask_jwt_extended 
##
pip3 install python-dotenv 
##
pip3 install sshtunnel 
##
pip3 install sqlalchemy 
##
pip3 install awswrangler 
##
pip3 install openai --upgrade 
##
pip3 install flask_cors 
##
pip3 install --upgrade google-api-python-client 
##
sudo pip install PyMySQL
##

Step 2 - Create .env file

Step 3 - Run AWS server

Backend:

Activate conda environment
##
Go to "backend" folder
##
python3 run.py
##

Frontend:

Go to "frontend" folder
##
npm start