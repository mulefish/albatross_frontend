# sgf meant 'simple go format' but backronymed to 'simple game format'
# files = ["testfile.txt"]  # works 
files = ["069.sgf"] # , "093.sgf"]

for sgf in files:
    with open(sgf, encoding='utf-8') as f:
        accumulator = []
        result = "" 
        for line in f:
            # print( line)
            if line[0:1] == ";":
                line = line.replace("\n","")
                line = line.replace(")","")
                accumulator.append(line)
            if line[0:3] == "RE[":
                result = line.replace("\n","")

        data = "".join(accumulator)
        print(data)
        print(result)