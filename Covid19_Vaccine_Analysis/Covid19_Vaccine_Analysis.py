#!/usr/bin/env python
# coding: utf-8

# # Covid19 Vaccine Analysis

# Many vaccines have been introduced so far to fight covid-19. No vaccine has guaranteed 100% accuracy so far, but most manufacturing companies claim their vaccine is not 100% accurate, but still, it will save your life by giving you immunity.
# 
# Thus, each country tries to vaccinate a large part of its population so as not to depend on a single vaccine. That’s I am going to analysis in this project, which is how many vaccines each country is using to fight covid-19. In the section below, I have made my project on Covid-19 vaccines analysis with Python.

# ### Importing the necessary Python libraries and the dataset

# In[3]:


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
data = pd.read_csv("country_vaccinations.csv")
data.head()


# ### Exploring this data before we start analyzing the vaccines taken by countries 

# In[4]:


data.describe()


# In[5]:


pd.to_datetime(data.date)


# In[6]:


data.country.value_counts()


# The United Kingdom is made up of England, Scotland, Wales, and Northern Ireland. But in the above data, these countries are mentioned separately with the same values as in the United Kingdom. So this may be an error while recording this data. So for fixing this error:

# In[7]:


data = data[data.country.apply(lambda x: x not in ["England", "Scotland", "Wales", "Northern Ireland"])]
data.country.value_counts()


# ### Exploring the vaccines available in this dataset

# In[8]:


data.vaccines.value_counts()


# So we have almost all the Covid-19 vaccines available in this dataset. Now I will create a new DataFrame by only selecting the vaccine and the country columns to explore which vaccine is taken by which country:

# In[9]:


df = data[['vaccines', 'country']]
df.head()


# #### Now let’s see how many countries are taking each of the vaccines mentioned in this data:

# In[10]:


dict_ = {}
for i in df.vaccines.unique():
    dict_[i] = [df['country'][j] for j in df[df['vaccines'] == i].index]
    

vaccines = {}
for key, value in dict_.items():
    vaccines[key] = set(value)
for i,j in vaccines.items():
    print(f'{i}:>>{j}')


# ### Now let’s visualize this data to have a look at what combination of vaccines every country is using:

# In[11]:


import plotly.express as px
import plotly.offline as py

vaccine_map = px.choropleth(data, locations = 'iso_code', color = 'vaccines')
vaccine_map.update_layout(height = 300, margin = {'r':0, 't':0, 'l':0, 'b':0})
vaccine_map.show()


# In[ ]:




