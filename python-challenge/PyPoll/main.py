import os
import csv

poll_data = os.path.join('..', 'Resources', 'election_data.csv')

#create lists to store data
total_votes = 0
candidate = []
percent_vote = []
candidate_total = []
khan = 0
correy = 0
li = 0
otooly = 0 

#open csv file, skip header and store
with open(poll_data) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    header = next(csvreader)

    #calculate votes for each candidate
    total_votes = 0
    for row in csvreader:
        total_votes = total_votes + 1
        if row[2] == "Khan":
            khan = khan + 1
        elif row[2] == "Correy":
            correy = correy + 1
        elif row[2] == "Li":
            li = li + 1
        else: 
            otooly = otooly + 1
           
#get percent for each candidate
khan_percent = round(khan / total_votes * 100)
correy_percent = round(correy / total_votes * 100)
li_percent = round(li / total_votes * 100)
otooly_percent = round(otooly / total_votes * 100)

#calculate the winner based on number of votes
winner = max(khan, correy, li, otooly)

#print results to Terminal 
print("Election Results")
print("-------------------------------")
print(f'Total Votes: {total_votes}')
print("-------------------------------")
print(f'Khan: {khan_percent}% {khan}')
print(f'Correy: {correy_percent}% {correy}')
print(f'Li: {li_percent}% {li}')
print(f"O'Tooley: {otooly_percent}% {otooly}")
print("-------------------------------")
print(f'Winner : {winner}')


# output_file = os.path.join(output.csv)
# with open(output_file, w) as datafile:
#     writer = csv.writer(datafile)
#     writer.writerow(
#         ("Election Results")
#         ("-------------------------------")
#         (f'Total Votes: {total_votes}')
#         ("-------------------------------")
#         (f'Khan: {khan_percent}% {khan}')
#         (f'Correy: {correy_percent}% {correy}')
#         (f'Li: {li_percent}% {li}')
#         (f"O'Tooley: {otooly_percent}% {otooly}")
#         ("-------------------------------")
#         (f'Winner : {winner}')
#     )
 
