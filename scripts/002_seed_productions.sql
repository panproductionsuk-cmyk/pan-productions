-- Seed existing productions data into the database

INSERT INTO productions (id, title, title_en, author, status, description_en, description_tr, image, dates, venue, duration, ticket_price, ticket_link, sort_date, category, show_in_marketing)
VALUES
  -- Theatre productions
  ('love-of-rumi', 'Love of Rumi: Flow and Spirit', 'Love of Rumi: Flow and Spirit', 'Aya Art, Berrin Bugay Lawler', 'Past',
   'Experience the essence of Rumi''s poetry through a captivating fusion of fashion and performance, celebrating love, flow, and spirit. A mystical journey featuring whirling dervish dance, choir, poetry reading, solo performances, and a costume parade with stylised 13th century costumes. This is not just a stage performance; it is an artistic experience that bridges the heart, mind, and soul.',
   'Rumi''nin şiirlerinin özünü, aşk, akış ve ruhu kutlayan büyüleyici bir moda ve performans füzyonu ile deneyimleyin. Semazen dansı, koro, şiir okuma, solo performanslar ve 13. yüzyıl kostümleriyle kostüm gösterisi içeren mistik bir yolculuk. Bu sadece bir sahne performansı değil; kalbi, zihni ve ruhu birleştiren sanatsal bir deneyimdir.',
   '/images/love-of-rumi.jpg', 'Friday, March 21, 2026, 7:00 PM', 'Mumford Theater, Cambridge', 'Performative Fashion Show', 'See Archive', NULL, '2026-03-21', 'theatre', true),

  ('sus', 'Sus.', 'Sus.', 'Ali Has', 'Past',
   E'SUS.\n\nThe loudest form of injustice.\n\nSix-year-old Nazlı left home one morning.\nShe had her notebook in hand.\nAnd she never came back.\n\nSus. brings to the stage not just a disappearance, but the story of a system woven with silence, fear, and vested interests.\n\nIn a village in the shadow of stone houses, everyone knows something…\nBut no one speaks.\n\nAs the truth slowly comes to light amid feudal ties, unseen powers, and a silence passed down through generations, the audience is left with one question:\n\nWho does silence protect?\nAnd who is the real culprit — those who don''t speak, or the system that won''t let them?\n\nSus. is a shocking stage experience that pushes the boundaries of justice and calls on the audience to confront their own conscience.\n\nDates:\n1–2–3–4 April 2026',
   E'SUS.\n\nAdaletsizliğin en gürültülü hali.\n\nAltı yaşındaki Nazlı bir sabah evden çıktı.\nElinde defteri vardı.\nVe bir daha hiç dönmedi.\n\nSus., yalnızca bir kayboluşun değil; sessizliğin, korkunun ve çıkar ilişkileriyle örülmüş bir düzenin hikayesini sahneye taşıyor.\n\nTaş evlerin gölgesindeki bir köyde herkes bir şey biliyor…\nAma kimse konuşmuyor.\n\nFeodal bağların, görünmeyen güçlerin ve kuşaktan kuşağa aktarılan suskunluğun ortasında gerçek yavaş yavaş gün yüzüne çıkarken seyirci şu soruyla baş başa kalıyor:\n\nSessizlik kimi korur?\nVe asıl suçlu kimdir — konuşmayanlar mı, yoksa konuşturmayan düzen mi?\n\nSus., adaletin sınırlarını zorlayan ve izleyiciyi vicdanıyla yüzleşmeye çağıran sarsıcı bir sahne deneyimi.\n\nTarih:\n1–2–3–4 Nisan 2026',
   '/images/sus.jpg', '1-2-3-4 April 2026, 19:30', 'Tower Theatre, 16 Northwold Road, London N16 7HR', 'Theatre Play', '£27', 'https://buy.stripe.com/bJe7sDbtY64NcU60TweZ209', '2026-04-01', 'theatre', true),

  ('earnest', 'The Importance of Being Earnest', NULL, 'Oscar Wilde', 'Past',
   'A brilliant comedy of manners that sparkles with wit and theatrical invention.',
   'Zekâ ve tiyatral buluşlarla parlayan, görgü kuralları üzerine muhteşem bir komedi.',
   '/images/importance-of-being-earnest.jpg', '6-18 January 2020', 'Tower Theatre, 16 Northwold Road, Stoke Newington, London N16 7HR', '2h 30min (including interval)', 'See Archive', NULL, '2020-01-06', 'theatre', false),

  ('tut-elimden-rovni', 'Tut Elimden Rovni', NULL, 'Aziz Nesin', 'Past',
   'A captivating theatrical performance - "hayatı bir cambazlık gösterisi" (life is a juggling show). Starring Ada Burke and Göktay Tosun, directed by Göktay Tosun.',
   'Hayatı bir cambazlık gösterisi olarak anlatan etkileyici bir tiyatro oyunu. Oyuncular: Ada Burke, Göktay Tosun. Yönetmen: Göktay Tosun.',
   '/images/tut-elimden-rovni.jpg', '27-28-29 March 2024, 20:00', 'Rosemary Branch Theatre, 2 Shepperton Rd, London N1 3DT', '2h (including interval)', 'See Archive', NULL, '2024-03-27', 'theatre', true),

  ('ben-kolay-olmem', 'Ben Kolay Ölmem', 'I Shan''t Perish Easily', 'Ali Has', 'Past',
   'A story of Cemal Süreya and Ahmed Arif - two poets, two lives, one story.',
   'Bir Cemal Süreya & Ahmed Arif hikayesi... İki şair, iki yaşam, bir hikaye.',
   '/images/ben-kolay-olmem.jpg', '11-12-13 March 2019, 19:00', 'Arcola Theatre, 24 Ashwin St, London E8 3DL', '2h', 'See Archive', NULL, '2019-03-11', 'theatre', false),

  ('olum-ve-kiz', 'Ölüm ve Kız', 'Death and the Maiden', 'Ariel Dorfman', 'Past',
   'A gripping psychological thriller. Directed by Katharina Reinthaller and Barış Celiloğlu. Cast: Barış Celiloğlu, Göktay Tosun, Yener Çelik. English surtitles included.',
   'Sürükleyici bir psikolojik gerilim. Yönetmenler: Katharina Reinthaller, Barış Celiloğlu. Oyuncular: Barış Celiloğlu, Göktay Tosun, Yener Çelik. İngilizce üst yazılı.',
   '/images/olum-ve-kiz.jpg', '4 June 2017, 20:00', 'Arcola Theatre, 24 Ashwin Street, London E8 3DL', '2h', 'See Archive', NULL, '2017-06-04', 'theatre', false),

  ('ufacik-tefecik-karadut', 'Ufacık Tefecik Karadut', 'Tiny Little Black Mulberry', 'Umut Uğur', 'Past',
   'A children''s play in Turkish for ages 5 to 75. Written and directed by Umut Uğur, designed by Katerina Theofanopoulou, original music by Muharrem Karaer and Erhan Şakar.',
   '5''den 75''e herkes için Türkçe çocuk oyunu. Yazan ve yöneten: Umut Uğur, tasarım: Katerina Theofanopoulou, müzik: Muharrem Karaer ve Erhan Şakar.',
   '/images/ufacik-tefecik-karadut.jpg', '15 April 2018', 'Pan Productions, London', 'Children''s Play', 'See Archive', NULL, '2018-04-15', 'theatre', false),

  ('ferhangi-seyler', 'Ferhangi Şeyler', 'Ferhangi Things', 'Ferhan Şensoy', 'Past',
   'A legendary one-man show by the iconic Turkish comedian and theatre artist Ferhan Şensoy. An unforgettable evening of humor, satire, and theatrical brilliance.',
   'Ferhan Şensoy''un efsanevi tek kişilik gösterisi. Mizah, hiciv ve tiyatro dolu unutulmaz bir gece.',
   '/images/ferhangi-seyler.jpg', '10 June 2017', 'Pan Productions, London', 'One-Man Show', 'See Archive', NULL, '2017-06-10', 'theatre', false),

  -- Music productions
  ('sakali-akustik', 'ŞAKALI AKUSTİK', NULL, 'Harun Tekin & Koray Candemir', 'Past',
   E'Two powerful voices of the rock scene — Mor ve Ötesi vocalist Harun Tekin and Kargo vocalist Koray Candemir take the "ŞAKALI AKUSTİK" stage, performing their own songs, each other''s works, and their favourite tracks in stripped-back acoustic arrangements.\n\nWith plenty of conversation, laughter, and a heartfelt atmosphere, this special performance offers a warm concert experience that feels like music being made at home.',
   E'Rock sahnesinin iki güçlü sesi, "Mor ve Ötesi"''nin solisti Harun Tekin ve "Kargo"''nun solisti Koray Candemir, "ŞAKALI AKUSTİK" sahnesinde; kendi şarkılarını, birbirlerinin eserlerini ve en sevdikleri parçaları sade akustik düzenlemelerle yorumluyor.\n\nBol sohbetli, bol kahkahalı ve içten atmosferiyle bu özel performans, seyirciye adeta evde müzik yapılıyormuş hissi veren sıcacık bir konser deneyimi sunuyor.',
   '/images/sakali-akustik.jpg', '26 March 2026', 'Islington Assembly Hall, London', 'Acoustic Concert', 'See Archive', NULL, '2026-03-26', 'music', true),

  ('gripin-jazz-cafe', 'GRİPİN returns to London', NULL, '', 'Past',
   'GRiPİN is back at one of London''s most iconic venues, Jazz Cafe, for a special live performance. Join us for an unforgettable night of powerful music, featuring special guest IKIYEONKALA.',
   'GRiPİN, Londra''nın en ikonik mekanlarından Jazz Cafe''de özel bir canlı performans için geri döndü. Özel konuk IKIYEONKALA ile güçlü müzik dolu unutulmaz bir geceye katılın.',
   '/videos/showcase.mp4', 'Sunday, January 11, 2026, 7:00 PM', 'Jazz Cafe, Camden Town', 'Concert', 'See Archive', NULL, '2026-01-11', 'music', true),

  ('jem-candlelit-concert', 'Jem: Intimate Candlelit Concert', NULL, '', 'Past',
   'Experience an intimate candlelit concert with Jem at St. Pancras Old Church on December 8. Let her ethereal voice and poetic melodies create a soulful, unforgettable evening. Tickets are limited, reserve yours now!',
   'St. Pancras Old Church''ta Jem ile samimi mum ışığında bir konser deneyimi. Eterik sesi ve şiirsel melodileriyle ruhani, unutulmaz bir akşam. Biletler sınırlı sayıda!',
   '/images/jem-concert.jpg', 'December 8, 2025', 'St. Pancras Old Church, London', 'Concert', 'See Archive', NULL, '2025-12-08', 'music', true),

  ('erkan-ogur-bulent', 'Erkan Oğur & Bülent Ortaçgil', NULL, '', 'Past',
   'An intimate concert featuring legendary Turkish musicians Erkan Oğur and Bülent Ortaçgil.',
   'Efsanevi Türk müzisyenler Erkan Oğur ve Bülent Ortaçgil''in samimi konseri.',
   '/images/erkan-ogur-bulent.jpg', '27 November 2016, 19:00', 'Islington Assembly Hall, Upper St, London N1 2UD', 'Concert', 'See Archive', NULL, '2016-11-27', 'music', false),

  ('erkan-ogur-ismail', 'Erkan Oğur & İsmail Hakkı Demircioğlu Konseri', NULL, '', 'Past',
   'Legendary Turkish musicians Erkan Oğur and İsmail Hakkı Demircioğlu in an enchanting musical encounter. "All folk songs are beautiful, they are life itself."',
   'Efsanevi Türk müzisyenler Erkan Oğur ve İsmail Hakkı Demircioğlu''nun büyüleyici müzikal buluşması. "Bütün türküler güzeldir, hayatın ta kendisidir."',
   '/images/erkan-ogur-ismail.jpg', '20 March 2011, 18:45', 'Union Chapel, Compton Terrace, London N1 2UN', 'Concert', 'See Archive', NULL, '2011-03-20', 'music', false),

  ('olcay-bayir-fundraiser', 'Olcay Bayır Fundraiser Concert', NULL, '', 'Past',
   'A special support concert featuring successful Kurdish-Turkish singer Olcay Bayır. Supported by Djanan Turan, Erdoğan Bayır, Ece & Debora. Live music and DJ Ece until sunrise.',
   'Başarılı Kürt-Türk şarkıcı Olcay Bayır''ın yer aldığı özel bir destek konseri. Djanan Turan, Erdoğan Bayır, Ece & Debora destekliyor. Canlı müzik ve DJ Ece sabaha kadar.',
   '/images/olcay-bayir-fundraiser.jpg', 'Friday 21 April, 7:30PM-1:00AM', 'Epic Dalston, 13 Stoke Newington Rd N16 8BH', 'Concert & DJ Event', 'See Archive', NULL, '2017-04-21', 'music', false)

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  title_en = EXCLUDED.title_en,
  author = EXCLUDED.author,
  status = EXCLUDED.status,
  description_en = EXCLUDED.description_en,
  description_tr = EXCLUDED.description_tr,
  image = EXCLUDED.image,
  dates = EXCLUDED.dates,
  venue = EXCLUDED.venue,
  duration = EXCLUDED.duration,
  ticket_price = EXCLUDED.ticket_price,
  ticket_link = EXCLUDED.ticket_link,
  sort_date = EXCLUDED.sort_date,
  category = EXCLUDED.category,
  show_in_marketing = EXCLUDED.show_in_marketing,
  updated_at = NOW();
