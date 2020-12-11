
from bs4 import BeautifulSoup
import requests
import pandas as pd
from splinter import Browser
from webdriver_manager.chrome import ChromeDriverManager
import time


executable_path = {'executable_path': ChromeDriverManager().install()}
browser = Browser('chrome', **executable_path, headless=False)


url = 'https://mars.nasa.gov/news/'
browser.visit(url)
time.sleep(3)


html = browser.html
soup = BeautifulSoup(html,'lxml')



# Extract title  and paragraph text
news_title = soup.find_all("div",class_="content_title")[1].text
news_p = soup.find_all("div", class_="article_teaser_body")[1].text
print(f"news_title = {news_title}")
print("----------------")
print(f"news_p = {news_p}")


jpl_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
browser.visit(jpl_url)
featured_image = browser.find_by_id('full_image')
time.sleep(3)
featured_image.click()
time.sleep(3)




html = browser.html
soup = BeautifulSoup(html, 'html.parser')



# Search for image source
image_path = soup.find('img', class_='fancybox-image')['src']
featured_image_url = f'https://www.jpl.nasa.gov{image_path}'
print(featured_image_url)



#Use Pandas to scrape the table for facts about Mars
mars_df = pd.read_html('https://space-facts.com/mars/')[0]
mars_df.columns=['description', 'value']
mars_df.set_index('description', inplace=True)
mars_df



mars_html = mars_df.to_html()
print(mars_html)



usgs_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
browser.visit(usgs_url)
html_hemispheres = browser.html
soup = BeautifulSoup(html_hemispheres, 'html.parser')




items = soup.find_all('div', class_='item')
titles = []
image_urls = []
home_url = 'https://astrogeology.usgs.gov'

for item in items: 
   
    title = item.find('h3').text
    titles.append(title) 



links = browser.find_by_css("a.product-item h3")
urls = []

for i in range(len(links)):    

    browser.find_by_css("a.product-item h3")[i].click()  
    soup = BeautifulSoup(browser.html, "html.parser")
    item = soup.find('div', class_='container').find('li').find('a').attrs['href']
    urls.append(item)    
    browser.back()

for i, item in enumerate(titles):
    print(f"Title: {titles[i]}, Image_url: {urls[i]}")



    