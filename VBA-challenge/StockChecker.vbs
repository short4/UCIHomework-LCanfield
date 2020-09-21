Sub StockChecker():

    'assign variables
    Dim ticker As String
    Dim Summary_Table As Integer   
    Dim open_price As Currency
    Dim close_price As Currency
    Dim volume As Double
    Dim Dollar_change As Currency
    Dim Percent_change As Double

    'assign headers
    Cells(1, 8).Value = "<ticker>"
    Cells(1, 9).Value = "<yearly_change>"
    Cells(1, 10).Value = "<percent_change>"
    Cells(1, 11).Value = "<volume>"

    'find last row
    lastrow = Cells(Rows.Count, 1).End(xlUp).Row

    'set summary table Row
    Summary_Table = 2

'loop through ticker symbols
For i = 2 To lastrow

    'Loop through stock ticker symbols
    If Cells(i, 1).Value <> Cells(i - 1, 1).Value Then
    
        'set ticker symbol
        ticker = Cells(i, 1).Value

        'set open price
        open_price = Cells(i, 3).Value

        'add to volume
        volume = Cells(i, 7).Value

        'Put stocker ticker in Summary Table 
        Range("H" & Summary_Table).Value = ticker

   'check if that is the last ticker and calculate price change
    ElseIf Cells(i, 1).Value <> Cells(i + 1, 1).Value Then

        'set close price
        close_price = Cells(i, 6)

        'calculate dollar change and percent change
        Dollar_change = (open_price - close_price)
        Percent_change = (Dollar_change / open_price)

        'calculate volume
        volume = volume + Cells(i, 7).Value

        'assign values to summary table
        Range("I" & Summary_Table).Value = Dollar_change
        Range("J" & Summary_Table).Value = Percent_change
        Range("K" & Summary_Table).Value = volume

        'add row to summary table 
        Summary_Table = Summary_Table + 1
            
    'reset volume to zero
    volume = 0

    'check if ticker is the same and add to volume
    Else
        volume = volume + Cells(i, 7).Value

    End If

Next i

End Sub


