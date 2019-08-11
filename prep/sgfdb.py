# sgf meant 'smart go format' but backronymed to 'smart game format' ( or was it 'simple'?)
import sqlite3
import glob
import os
#files = ["069.sgf", "093.sgf"]
db_file="games.db"

def insertData(dt, name, result, moves):
    conn = sqlite3.connect(db_file)
    c = conn.cursor()
    sql = 'insert into games ( dt, name, result, moves ) values ("{0}","{1}","{2}","{3}")'.format(dt, name, result, moves)
    print( sql )
    c.execute(sql)
    conn.commit()
    conn.close()

path = './training/'

#for sgf in files:
for sgf in glob.glob(os.path.join(path, '*.sgf')):
    with open(sgf, encoding='utf-8') as f:
        accumulator = []
        result = ""
        dt = ""
        name = "" 
        for line in f:
            # print( line)
            if line[0:1] == ";":
                line = line.replace("\n","")
                line = line.replace(")","")
                accumulator.append(line)
            if line[0:3] == "RE[":  
                result = line.replace("\n","")
            if line[0:3] == "DT[":
                dt = line.replace("\n","")

        moves = "".join(accumulator)
        name = sgf.replace("./training\\", "")
        insertData(dt, sgf, result, moves)
print("The end")