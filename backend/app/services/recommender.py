from app.api.schemas import PredictRequest, Recommendations

# Localized category labels
LOCALIZED_LABELS = {
    "id": {
        "Insufficient_Weight": "Berat Badan Kurang",
        "Normal_Weight": "Berat Badan Normal",
        "Overweight_Level_I": "Kelebihan Berat Badan Tingkat I",
        "Overweight_Level_II": "Kelebihan Berat Badan Tingkat II",
        "Obesity_Type_I": "Obesitas Tingkat I",
        "Obesity_Type_II": "Obesitas Tingkat II",
        "Obesity_Type_III": "Obesitas Tingkat III",
        "Underweight": "Berat Badan Kurang",
        "Normal": "Normal",
        "Overweight": "Berat Badan Lebih",
        "Obese": "Obesitas"
    },
    "en": {
        "Insufficient_Weight": "Insufficient Weight",
        "Normal_Weight": "Normal Weight",
        "Overweight_Level_I": "Overweight Level I",
        "Overweight_Level_II": "Overweight Level II",
        "Obesity_Type_I": "Obesity Type I",
        "Obesity_Type_II": "Obesity Type II",
        "Obesity_Type_III": "Obesity Type III",
        "Underweight": "Underweight",
        "Normal": "Normal",
        "Overweight": "Overweight",
        "Obese": "Obese"
    }
}

# Rule-based general recommendations mapping based on predicted class
GENERAL_RECOMMENDATIONS = {
    "id": {
        "obesity": "Hasil analisis menunjukkan kecenderungan Obesitas. Disarankan untuk berkonsultasi dengan dokter gizi atau profesional kesehatan untuk menyusun rencana penurunan berat badan yang aman dan terukur secara bertahap.",
        "overweight": "Kondisi fisik Anda menunjukkan berat badan berlebih (overweight). Fokuslah pada defisit kalori ringan, perbaikan pola makan harian, dan peningkatan aktivitas fisik harian untuk kembali ke rentang berat badan ideal.",
        "underweight": "Berat badan Anda berada di bawah rata-rata ideal (underweight). Prioritaskan asupan makanan padat nutrisi tinggi kalori sehat dan protein, serta mulailah latihan kekuatan otot (strength training) untuk meningkatkan massa otot secara sehat.",
        "normal": "Selamat! Berat badan Anda berada dalam kategori sehat (normal). Pertahankan kombinasi pola hidup aktif dan pola makan bergizi seimbang saat ini untuk menjaga kebugaran tubuh."
    },
    "en": {
        "obesity": "The analysis indicates a tendency towards Obesity. It is recommended to consult a nutritionist or healthcare professional to develop a safe and structured weight loss plan gradually.",
        "overweight": "Your physical condition indicates overweight. Focus on a mild calorie deficit, improving daily dietary habits, and increasing daily physical activity to return to the ideal weight range.",
        "underweight": "Your weight is below the ideal average (underweight). Prioritize nutrient-dense, high-calorie healthy foods and protein, and start strength training to build muscle mass healthily.",
        "normal": "Congratulations! Your weight is in the healthy category (normal). Maintain your current combination of an active lifestyle and balanced, nutritious diet to keep your body fit."
    }
}

def get_localized_label(predicted_label: str, lang: str = "id") -> str:
    """Get translation for prediction label."""
    return LOCALIZED_LABELS.get(lang, LOCALIZED_LABELS["id"]).get(predicted_label, predicted_label)

def get_bmi_category(bmi: float, lang: str = "id") -> str:
    """Calculate standard BMI category based on calculated BMI value."""
    if bmi < 18.5:
        key = "Underweight"
    elif bmi < 25.0:
        key = "Normal"
    elif bmi < 30.0:
        key = "Overweight"
    else:
        key = "Obese"
    return LOCALIZED_LABELS.get(lang, LOCALIZED_LABELS["id"]).get(key, key)

def generate_recommendations(request: PredictRequest, predicted_label: str) -> Recommendations:
    """
    Generate bilingual recommendations (Indonesian/English) based on user's habits and prediction result.

    Args:
        request (PredictRequest): The user inputs.
        predicted_label (str): The English class label predicted by the model (e.g. 'Normal_Weight').

    Returns:
        Recommendations: Pydantic Recommendations schema object containing general and specific lists.
    """
    lang = request.language if request.language in ["id", "en"] else "id"
    
    # 1. Determine general recommendation
    if "Obesity" in predicted_label:
        general_rec = GENERAL_RECOMMENDATIONS[lang]["obesity"]
    elif "Overweight" in predicted_label:
        general_rec = GENERAL_RECOMMENDATIONS[lang]["overweight"]
    elif "Insufficient" in predicted_label:
        general_rec = GENERAL_RECOMMENDATIONS[lang]["underweight"]
    else:
        general_rec = GENERAL_RECOMMENDATIONS[lang]["normal"]

    # 2. Determine specific recommendations (habits check)
    specific_recs = []

    # Vegetable consumption
    if request.FCVC == 1.0:
        if lang == "id":
            specific_recs.append("Anda menyatakan tidak pernah mengonsumsi sayuran dalam menu makanan. Kekurangan serat dapat memperlambat pencernaan dan mengurangi rasa kenyang. Cobalah tambahkan setidaknya satu porsi sayur pada menu makan harian Anda.")
        else:
            specific_recs.append("You indicated that you never consume vegetables in your meals. A lack of fiber can slow digestion and reduce satiety. Try adding at least one serving of vegetables to your daily meals.")
    elif request.FCVC == 2.0:
        if lang == "id":
            specific_recs.append("Anda kadang-kadang mengonsumsi sayuran. Tingkatkan asupan tersebut agar selalu ada di setiap makan utama guna mencukupi kebutuhan mikronutrisi dan menjaga kesehatan pencernaan Anda.")
        else:
            specific_recs.append("You sometimes consume vegetables. Increase this intake so it is present in every main meal to meet your micronutrient needs and maintain digestive health.")

    # Water intake
    if request.CH2O == 1.0:
        if lang == "id":
            specific_recs.append("Konsumsi air mineral Anda kurang dari 1 liter per hari. Hidrasi yang rendah memperlambat metabolisme. Targetkan minum minimal 2 liter air mineral sehari.")
        else:
            specific_recs.append("Your daily mineral water consumption is less than 1 liter. Low hydration slows down metabolism. Target drinking at least 2 liters of mineral water daily.")
    elif request.CH2O == 2.0:
        if lang == "id":
            specific_recs.append("Anda minum di antara 1 hingga 2 liter air mineral per hari. Usahakan untuk meningkatkannya hingga mencapai minimal 2 liter per hari.")
        else:
            specific_recs.append("You drink between 1 and 2 liters of mineral water daily. Try to increase it to reach at least 2 liters per day.")

    # Physical activity
    if request.FAF == 0.0:
        if lang == "id":
            specific_recs.append("Anda menyatakan tidak melakukan aktivitas fisik/olahraga dalam seminggu. Perilaku kurang gerak (sedentary) dapat memicu penumpukan lemak. Mulailah dengan jalan santai selama 10-15 menit setiap hari.")
        else:
            specific_recs.append("You stated that you do not perform physical activity or exercise weekly. Sedentary behavior can lead to fat accumulation. Start with a walk for 10-15 minutes every day.")
    elif request.FAF == 1.0:
        if lang == "id":
            specific_recs.append("Aktivitas fisik Anda baru 1-2 hari seminggu. Cobalah naikkan intensitasnya secara perlahan menjadi 3 hari seminggu.")
        else:
            specific_recs.append("Your physical activity is only 1-2 days a week. Try to increase its intensity gradually to 3 days a week.")

    # High calorie food frequency
    if request.FAVC == "yes":
        if lang == "id":
            specific_recs.append("Anda sering mengonsumsi makanan berkalori tinggi (fast food, gorengan). Batasi frekuensinya menjadi maksimal 1-2 kali seminggu, dan gantilah dengan masakan rumahan yang diolah dengan cara dikukus, direbus, atau dipanggang.")
        else:
            specific_recs.append("You frequently consume high-calorie foods (fast food, fried food). Limit its frequency to a maximum of 1-2 times a week, and replace it with home-cooked meals prepared by steaming, boiling, or baking.")

    # Snacking habit
    if request.CAEC in ["Frequently", "Always"]:
        if lang == "id":
            specific_recs.append("Kebiasaan ngemil Anda tergolong sering/selalu di antara waktu makan. Kurangi camilan tinggi gula dan minyak, ganti dengan potongan buah segar atau kacang-kacangan.")
        else:
            specific_recs.append("Your snacking habits are frequent/always between meals. Reduce snacks high in sugar and oil, and replace them with fresh fruit slices or nuts.")

    # Screen time + Exercise
    if request.TUE == 2.0 and request.FAF <= 1.0:
        if lang == "id":
            specific_recs.append("Waktu penggunaan gadget harian Anda lebih dari 5 jam dibarengi dengan olahraga yang minim. Biasakan untuk berdiri atau berjalan sejenak setiap 50 menit berada di depan layar.")
        else:
            specific_recs.append("Your daily screen time is more than 5 hours accompanied by minimal exercise. Habituate standing or walking for a moment every 50 minutes spent in front of the screen.")

    # Alcohol frequency
    if request.CALC in ["Frequently", "Always"]:
        if lang == "id":
            specific_recs.append("Anda mengonsumsi alkohol secara sering/selalu. Alkohol mengandung kalori kosong yang tinggi dan dapat mengganggu fungsi metabolisme hati. Disarankan untuk membatasi konsumsinya secara signifikan.")
        else:
            specific_recs.append("You consume alcohol frequently/always. Alcohol contains high empty calories and can interfere with liver metabolic function. It is highly recommended to limit its consumption significantly.")

    # Calorie monitoring
    if request.SCC == "no":
        if lang == "id":
            specific_recs.append("Anda belum memantau asupan kalori harian. Untuk membantu mengontrol berat badan, Anda bisa mulai mencatat makanan harian secara berkala.")
        else:
            specific_recs.append("You are not monitoring your daily calorie intake. To help control weight, you can start logging your daily meals periodically.")

    # Passive transport + Exercise
    if request.MTRANS in ["Automobile", "Motorbike"] and request.FAF <= 1.0:
        if lang == "id":
            specific_recs.append("Anda terbiasa menggunakan kendaraan pribadi (mobil/motor) dan kurang berolahraga. Cobalah sesekali beralih ke transportasi umum atau biasakan memarkir kendaraan agak jauh agar tubuh tetap aktif bergerak harian.")
        else:
            specific_recs.append("You are accustomed to using private vehicles (car/motorcycle) and lack exercise. Try switching to public transportation occasionally or habituate parking your vehicle a bit further so your body remains active daily.")

    return Recommendations(general=general_rec, specific=specific_recs)
