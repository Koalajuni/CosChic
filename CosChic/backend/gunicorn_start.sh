#!/bin/bash
NAME="COSCHIC"                            
DJANGODIR=/home/ai/ai/chicbytes/CosChic/backend                      
SOCKFILE=/home/ai/ai/chicbytes/CosChic/backend/chicbytes.sock       
USER=ai                                       
GROUP=chicbytes                                       
NUM_WORKERS=4                                          
DJANGO_SETTINGS_MODULE=backend.settings        
DJANGO_WSGI_MODULE=backend.wsgi                

echo "Starting $NAME as `whoami`"

# Activate the virtual environment
cd $DJANGODIR
source /home/ai/ai/chicbytes/CosChic/backend/venv
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

# Start your Django Unicorn
exec gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user=$USER --group=$GROUP \
  --bind=unix:$SOCKFILE \
  --log-level=debug \
  --log-file=-
