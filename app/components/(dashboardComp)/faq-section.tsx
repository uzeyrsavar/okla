"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui"

const faqs = [
  {
    question: "OKLA'yi kullanmak ucretsiz mi?",
    answer: "Evet, OKLA'nin temel ozellikleri tamamen ucretsizdir. Okul arama, yorum okuma ve degerlendirme yapma gibi tum temel islevleri ucretsiz olarak kullanabilirsiniz. Premium ozellikler icin uygun fiyatli abonelik seceneklerimiz mevcuttur.",
  },
  {
    question: "Yorumlar nasil dogrulaniyor?",
    answer: "Tum yorumlar, yapay zeka destekli moderasyon sistemimiz ve uzman ekibimiz tarafindan incelenmektedir. Ayrica kullanicilarin gercek veli veya ogrenci oldugunu dogrulamak icin cesitli onay mekanizmalari kullaniyoruz.",
  },
  {
    question: "Hangi okullar platformda yer aliyor?",
    answer: "Turkiye genelinde 81 ildeki tum ilkogretim, ortaogretim ve lise duzeyindeki devlet ve ozel okullar platformumuzda yer almaktadir. Universite bolumleri icin de degerlendirme sistemi mevcuttur.",
  },
  {
    question: "Nasil yorum yapabilirim?",
    answer: "Yorum yapabilmek icin ucretsiz bir hesap olusturmaniz gerekmektedir. Hesabinizi olusturduktan sonra deneyimleiniginiz okullar hakkinda detayli degerlendirmeler paylasabilirsiniz.",
  },
  {
    question: "Okul bilgileri ne siklikla guncelleniyor?",
    answer: "Okul bilgileri MEB verileriyle duzenlij olarak senkronize edilmekte ve kullanici geri bildirimleriyle surekli guncellenmektedir. Ayrica okullar kendi profillerini guncelleyebilmektedir.",
  },
  {
    question: "Olumsuz yorumlar silinir mi?",
    answer: "Yapici elestiriler ve olumsuz deneyimler platformumuzda yer alabilir. Ancak hakaret iceren, kisisel saldiri niteliginde veya asilsiz iddialara dayanan yorumlar kaldirilmaktadir. Seffaflik ilkemiz geregi durust yorumlara saygi duyuyoruz.",
  },
]

export function FAQSection() {
  return (
    <section id="sss" className="py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            SSS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foreground mb-6 text-balance">
            Sikca Sorulan Sorular
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Merak ettiginiz her seyin cevabi burada
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary/20 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-all duration-300"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary py-6 text-lg font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
