# sgf meant 'simple go format' but backronymed to 'simple game format'
# files = ["testfile.txt"]  # works 
files = ["069.sgf", "093.sgf"]

for sgf in files:
    with open(sgf) as f:
        for line in f:
            print( line)

#### FAILBOT! I think these .sgf files has some japanese char (?) somewhere in the files. 
#### Question: How to deal? 
####
#### Currently: Running into this error: 
########################################
#
#C:\Users\squar\game\jsgo\python_backend>python SGFParser.py  > tmp.txt
#Traceback (most recent call last):
#  File "SGFParser.py", line 7, in <module>
#    for line in f:
#  File "C:\Users\squar\AppData\Local\Programs\Python\Python36\lib\encodings\cp1252.py", line 23, in decode
#    return codecs.charmap_decode(input,self.errors,decoding_table)[0]
#UnicodeDecodeError: 'charmap' codec can't decode byte 0x8d in position 97: character maps to <undefined>
#
#C:\Users\squar\game\jsgo\python_backend>
#

