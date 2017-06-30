mongo jingting --eval "db.admins.remove({})"
mongo jingting --eval "db.admins.save({username: 'admin', password: 'admin123'})"