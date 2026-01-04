# Financehub

## Description
A modern Portfolio dashboard for investor. Modern investors need real-time insights into their portfolio performance to make informed decisions—whether to buy, sell, hold, or add to positions. 

## key challanges faced by me
- Yahoo Finance and Google Finance do not provide official public APIs so i use a server-side data access layer with unofficial libraries
- Refresh CMP, P/E form yahoo-finance2 vio polling in  every 15 sec
- There are TWO different kinds of data one i static , other is dynamic

- it is hardcoded seed data in the data folder, in future we can use persistant database, and can expose a rest api for client to upload therir static data

```
    {
    "symbol": "TCS",
    "exchange": "NSE",
    "sector": "Technology",
    "purchasePrice": 3200,
    "quantity": 10
  }
```


- CMP, P/E ratio , latest earning from external sources(yahoo-finance2), which is updated continuously(via polling)

-  expose api route /api/portfolio for client to GET the data
- implemnt a custom usePortfolio hook , where i implement the polling logic using setInterval, inside useEffect.
- implement the portfolio table using tanstack table library
- implement summaryCard, where Total investment, current value, overall return
- implement group by sector and sector wise summeries 

