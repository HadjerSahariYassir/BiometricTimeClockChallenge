# Node js Coding Challenge
# Mini-project “Biometric Time Clock”

# Author: 
    SAHARI HADJER

# Implemenation using  : 
    node.js, typescript, express.js, mongoose, jest ...


# Modelisation propsed :
    i created two models Employee model and TimeClock model
    i consisered that an employee has many timeCloks in the day and timeclocks refers to one employee

    # check-in conditions:
       each time employee check-in, new timeClok instance is added into database
       employee could not do a another check-in after he checkout 

    # check-out conditions
       each ceckout is an update of last checkin(timeClok)
       checkout is done after another check-in in same day
       checkout out could not be done untill that there is last checkin with empty checkout in same day


# Documentation :

[Documentation link](https://documenter.getpostman.com/view/30884101/2s9YXe74Tf)

