import praw
"""Takes a reddit post and makes a request to get all of the comments,
it then makes an association map from the comment tree"""


def commentRecursion(comment,outfile):
    "Recurses into a comment tree to find all replies and make an assoc"
    if list(comment._replies) == []:
        return None
    else:
        for reply in list(comment._replies):
            outfile.write(comment.body.replace('\n',' ') + '->' +
                          reply.body.replace('\n',' ') + '\n')
            commentRecursion(reply,outfile)
        
            

#making a reddit instance
reddit = praw.Reddit(client_id='JSwtsgS1SDP6og',
                     client_secret='v_b7v5ZU7cHQgvdafWJGj6vZ84A',
                     user_agent='python')

#get input from user
if input('Would you like to browse a subreddit for posts or enter a post id?(1 or 2):') == '1':
    subreddit_input = input("Input a subreddit: ")
    print("Here are some of the top posts: \n")
    try:
        subreddit = reddit.subreddit(subreddit_input)
        for post in subreddit.hot(limit=10):
            print(post.title)
            print('id: ' + post.id)
    except:
        print("Something went wrong..")
    
submission_input = input("\nInput a reddit submission id: ")    

try:
    #creates submission instance
    submission = reddit.submission(submission_input)

    #pulls out comment instance from submission
    comments = submission.comments

    #opens file for writing the assocs
    outfile = open('assoc_' + submission.id + '.txt','w')
    
    for comment in comments:
        commentRecursion(comment,outfile)
finally:
    outfile.close()

