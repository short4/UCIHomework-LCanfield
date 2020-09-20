Sub StockChecker():

'assign variables
Dim ticker As Script
Dim open_price As Double
Dim close_price As Double
Dim volume As Long
Dim Dollar_change As Double
Dim Percent_change As Double

'assign headers
Cells(1, 8).Value = "<ticker>"
Cells(1, 9).Value = "<yearly_change>"
Cells(1, 10).Value = "<percent_change>"
Cells(1, 11).Value = "<volume>"

'find last row
lastrow = Cells(Rows.Count, 1).End(xlUp).Row

'loop through ticker symbols
For i = 2 To lastrow

'set volume to 0
volume = 0

If Cells(i, 1).Value <> Cells(i - 1, 1).Value Then
    ticker = Cells(i, 1).Value
    open_price = Cells(i, 3).Value
    volume = Cells(i, 7).Value

    If Cells(i, 1).Value = Cells(i - 1, 1).Value Then
    volume = Cells(i, 7).Value + volume

        If Cells(i, 1).Value <> Cells(i + 1, 1).Value Then
        close_price = Cells(i, 6)
        Dollar_change = open_price - close_price
        Percent_change = Dollar_change / open_price

    End If

    For j = 2 To 50

    Cells(j, 8).Value = ticker
    Cells(j, 9).Value = Dollar_change
    Cells(j, 10).Value = Percent_change
    Cells(j, 11).Value = volume

    Next j

Next i

End Sub
