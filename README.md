# Sentiment Analysis of Drug Reviews

This project focuses on analyzing user-generated drug reviews to classify patient sentiment into positive, neutral, and negative categories. The study uses multiple machine learning, deep learning, and transformer-based models and evaluates their performance across three datasets: UCI DrugLib, WebMD, and a combined UCI + WebMD dataset. The work also investigates the impact of class balancing using the Synthetic Minority Oversampling Technique (SMOTE). The project demonstrates that hybrid and transformer-based approaches significantly improve sentiment classification accuracy, making the system suitable for large-scale healthcare text mining and pharmaceutical analytics.

---

## Project Objectives

1. Perform sentiment classification on large-scale drug review datasets.
2. Evaluate classical machine learning, deep learning, and transformer-based models.
3. Analyze the effects of SMOTE on dataset balance and performance.
4. Identify the optimal model across multiple dataset variants.
5. Provide a detailed comparison between existing methods and the proposed hybrid approach.

---

## Datasets Used

The project uses six dataset variants derived from three primary datasets:

1. UCI DrugLib Dataset (with and without SMOTE)
2. WebMD Drug Reviews Dataset (with and without SMOTE)
3. Combined UCI + WebMD Dataset (with and without SMOTE)

### WebMD Dataset
- Rows: 362,806  
- Selected attributes: EaseOfUse, Effectiveness, Reviews  
- Sentiment labels derived from numerical scores  
- SMOTE applied to rebalance the dataset

  
<img width="780" height="304" alt="image" src="https://github.com/user-attachments/assets/c7d32201-a638-4bb8-b12d-1a7496c77be9" />

The above image shows the class distribution for the WebMD dataset before and after SMOTE 
algorithm was applied on the dataset, with the dataset becoming more balanced after SMOTE algorithm was applied on it,



### UCI DrugLib Dataset
- Rows: 4,143  
- Selected attributes: rating, benefitsReview, sideEffectsReview, commentsReview  
- Sentiment derived from rating  
- SMOTE applied to equalize class distribution


<img width="827" height="328" alt="image" src="https://github.com/user-attachments/assets/5642700b-4e57-4a8d-8dd0-6f6094529992" />

The above image shows the class distribution for the UCI drugLib dataset before and after SMOTE algorithm was applied on the dataset, with the dataset becoming more balanced after SMOTE algorithm was applied on it.

### Combined Dataset
- Rows: 363,842  
- Selected attributes: rating, effectiveness, easeOfUse, benefitsReview, sideEffectsReview, commentsReview  
- Merging improves generalization and linguistic diversity  
- SMOTE applied for balanced learning

<img width="826" height="331" alt="image" src="https://github.com/user-attachments/assets/b39e3991-d300-4906-8736-febf1d15d109" />

The above image shows the class distribution for the UCI drugLib dataset before and after SMOTE algorithm was applied on the dataset, with the dataset becoming more balanced after SMOTE algorithm was applied on it.
---

## Methodology

1. **Dataset Loading**  
   Data extracted from CSV files and validated for formatting consistency.

2. **Data Preprocessing**  
   - Merging multiple review fields  
   - Removing missing values  
   - Assigning sentiment labels based on ratings  
   - Encoding sentiment classes  

3. **Class Balancing using SMOTE**  
   Applied to eliminate class imbalance and improve classifier fairness.

4. **Data Splitting**  
   - 80% training data  
   - 20% testing data  
   - Stratified split ensures consistent sentiment distribution  

5. **Model Training**  
   Models trained on all dataset variants to compare performance.

6. **Evaluation**  
   Accuracy is the primary metric.  
   Best-performing model identified per dataset.

---

## Models Used

### Deep Learning Models
- CNN  
- CNN + BiLSTM  
- Bio-BERT  
- DistilBERT

### Machine Learning Models
- Random Forest  
- XGBoost  
- SVM  
- Ensemble Voting Classifier (Logistic Regression + Random Forest + XGBoost)

---

## Experimental Results

### UCI DrugLib Dataset
- DistilBERT achieved highest accuracy with SMOTE: **98.69%**
- Without SMOTE:
  - SVM: **85.85%**
  - DistilBERT: **88.74%**
- SMOTE improved performance of all major models

### WebMD Dataset
- Without SMOTE:
  - CNN: **82.5%**
- With SMOTE:
  - Hybrid CNN + BiLSTM: **81.89%**

### Combined Dataset
- With SMOTE:
  - CNN + BiLSTM: **90.28%**
  - CNN: **90.17%**
- Without SMOTE:
  - CNN: **89.15%**

### Observations
- Deep learning models generalize well on larger datasets.
- Transformer models significantly benefit from SMOTE.
- Ensemble methods perform strongly on structured datasets like UCI DrugLib.

---

## Comparison with Existing Work

Existing methods:
- SVM: 74%
- Voting Classifier: 78%
- DistilBERT: 88%

Proposed method results:
- DistilBERT: **98.69%**
- Ensemble Voting Classifier: **95.56%**
- CNN (combined dataset): **89.15%**

This demonstrates major performance improvements due to dataset diversity, hybrid modeling, and SMOTE balancing.

---

## Conclusion

This project shows that sentiment analysis of drug reviews can be greatly enhanced using:

- Multiple datasets  
- Balanced training using SMOTE  
- Hybrid CNN + BiLSTM architectures  
- Transformer-based models such as DistilBERT and BioBERT  

DistilBERT achieved the highest accuracy overall at **98.69%** on the UCI DrugLib dataset, demonstrating strong potential for real-world healthcare text sentiment analysis.

---

## Future Work

- Hyperparameter tuning and extended fine-tuning of transformer models  
- GAN-based text augmentation  
- Aspect-based sentiment analysis  
- Emotion detection beyond positive/neutral/negative  
- Multilingual dataset extensions  
- Deployment into real-time pharmacovigilance tools  

