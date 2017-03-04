'''
Read in hamlet and return file of associations:
Example sentence 1 -> Example sentence 2
Phrase 1 -> Phrase 2
'''

def sanitize(line):
    # Squish onto one line, following poem quoting conventions
    line = line.replace('\n', '/')

    # Skip non-dialogue parts of the play.
    if line.startswith('Scene') or \
       line.startswith('ACT') or \
       line.startswith('['):
        return None

    # Piece of dialogue, text after first period is what we want
    start = line.find('./')

    # Skip past . and /
    line = line[start+2:]
    return line.split('/')[0] # TODO

    line = line.replace('/', ' / ')
    return line

with open('hamlet.txt') as fi:
    with open('assoc_hamlet.txt', 'w') as fo:
        cts = fi.read()
        lines = cts.split('\n\n')

        last_line = None
        for line in lines[1:]:
            line = sanitize(line)
            if last_line and line:
                print(last_line, '->', line, file=fo)
            last_line = line

        fi.close()
        fo.close()
