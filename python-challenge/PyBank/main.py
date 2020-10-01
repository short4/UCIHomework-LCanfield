import os
import csv

bank_data = os.path.join('..', 'Resources','budget_data.csv')

#define variables 
months = 0
total_profits = 0
profit_change = 0
change_pl = []
profit_list = []
average_change = 0
average_list = []
total_change = 0
greatest_increase = 0
greatest_decrease = 0

#define average function
def average(numbers):
    total = 0.0
    for number in numbers: 
        total - total_profits / months

with open(bank_data) as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=',')

    #skip header row and store header row
    header = next(csvreader)

    #calculate values
    for row in csvreader:
        months = months + 1
        total_profits = round(total_profits + float(row[1]))
        #profit_change = sum(int(row[1]) - int(1 - row[1]))
        change_pl.append(profit_change)
        average_change = float(profit_change) / months
        average_list.append(average_change)
        greatest_increase = max(change_pl)
        greatest_decrease = min(change_pl)

       


    # for i in range(1, months):
    #     profit_change.append(total_profits[i] - total_profits[i-1])
    #     average_change = sum(profit_change)/len(profit_change)
    #     # profit_change1 = float(row[1])
        # profit_change2 = float(row-1[1])
        # profit_change = profit_change2 - profit_change1
        # change_pl.append(profit_change)

     
print("Financial Analysis")
print("-----------------------------")
print(f"Total Months: ", {months})
print(f'Total: {total_profits}')
print(f'Average Change: {average_change}')
print(f'Greatest Increase in Profits: {greatest_increase}')
print(f'Greatest Decrease in Profits: {greatest_decrease}')




    



    
    #function to calculate average
    #def average(profit):
    #    length = len(profit)
    #    total = 0
    #    for number in profit:
    #      total += number
    # return total / length

