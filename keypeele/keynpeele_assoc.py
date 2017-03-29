try:
    infile = open("chainwax.txt",'r')
    outfile = open("chainwax_assoc.txt",'w')
    text = infile.read()
    text = text.replace("-","")
    lines = text.split("\n")
    for line in lines:
        line = line.strip()
    currentIndex = 0
    while(currentIndex+1 != len(lines)):
        outfile.write(lines[currentIndex] + "->" + lines[currentIndex+1] + "\n")
        currentIndex = currentIndex + 1
finally:
    infile.close()
    outfile.close()
