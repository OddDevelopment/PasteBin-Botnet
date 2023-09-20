# Setting up your command and control server on rentry
*I know its called the pastebin botnet but rentry is way better because it does not require an account to edit and has less rate limits*

### 1. Make a paste
Go to https://rentry.org/ and make a paste using the format below! MAKE SURE TO HAVE AN EDIT CODE SO YOU CAN CHANGE IN THE FUTURE!
```
{
"site":"N/A",
"useragent":"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
}
```

### 2. Start attacking a site
After you have set up the script on a few servers now you will have the power to attack a site, To do this use your edit code to change your site or useragent and start attacking, I will have an example below!
```
{
"site":"https://example.com",
"useragent":"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
}
```

### 3. Stopping the attack
To stop the attack simply switch the site value back to "N/A", I will include an example bwlow.
```
{
"site":"N/A",
"useragent":"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
}
```
