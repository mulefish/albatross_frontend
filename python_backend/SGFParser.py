# sgf meant 'simple go format' but backronymed to 'simple game format'
# files = ["testfile.txt"]  # works 
files = ["069.sgf", "093.sgf"]

for sgf in files:
    with open(sgf, encoding='utf-8') as f:
        for line in f:
            print( line)
