#!/usr/bin/env python
# coding: utf-8

# # Loading pickel file

# In[53]:


import pickle
p=pickle.load(open('model.pkl','rb'))


# In[54]:


import numpy as np
from sklearn.preprocessing import StandardScaler


# In[55]:


def main():
    lda = pickle.load(open("lda.pkl",'rb'))
    sc = pickle.load(open("sc.pkl",'rb'))


# Predict the customer segment for a new wine
    new_wine = np.array([[14.3,1.92,2.72,20,120,2.8,3.14,0.33,1.97,6.2,1.07,2.65,1280]])
    new_wine_scaled = sc.transform(new_wine)
    new_wine_lda = lda.transform(new_wine_scaled)
    predicted_segment = p.predict(new_wine_lda)
    print("Predicted customer segment:", predicted_segment)

if __name__ == "__main__":
    main()


# In[ ]:





# In[ ]:




