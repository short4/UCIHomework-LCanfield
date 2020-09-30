import os
import csv

poll_data = os.path.join('..', 'Resources', 'election_data.csv')

#create lists to store data
votes = []
candidate = []
percent_vote = []
candidate_total = []
khan = 0
correy = 0
li = 0
otooly = 0 


with open(poll_data) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    header = next(csvreader)

    total_votes = 0
    for row in csvreader:
        total_votes = total_votes + 1
        if row[2] == "Khan":
            khan = khan + 1
        elif row[2] == "Correy":
            correy = correy + 1
        elif row[2] == "Li":
            li = li + 1
        else: otooly = otooly + 1

khan_percent = round(khan / total_votes * 100)
correy_percent = round(correy / total_votes * 100)
li_percent = round(li / total_votes * 100)
otooly_percent = round(otooly / total_votes * 100)




  
print("Election Results")
print("-------------------------------")
print(f'Total Votes: {total_votes}')
print("-------------------------------")
print(f'Khan: {khan_percent} % {khan}')
print(f'Correy: {correy_percent} % {correy}')
print(f'Li: {li_percent} % {li}')
print(f"O'Tooley: {otooly_percent} % {otooly}")
print("-------------------------------")




