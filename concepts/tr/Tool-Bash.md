# Bash

## Tanım

Shell komutu çalıştırır, isteğe bağlı zaman aşımı ayarını destekler. Çalışma dizini komutlar arasında kalıcıdır, ancak shell durumu (ortam değişkenleri vb.) kalıcı değildir.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `command` | string | Evet | Çalıştırılacak bash komutu |
| `description` | string | Hayır | Komutun kısa açıklaması |
| `timeout` | number | Hayır | Zaman aşımı süresi (milisaniye), maksimum 600000, varsayılan 120000 |
| `run_in_background` | boolean | Hayır | Arka planda çalıştırılıp çalıştırılmayacağı |

## Kullanım Senaryoları

**Kullanıma uygun:**
- git işlemleri (commit, push, branch vb.)
- npm/yarn gibi paket yönetim komutları
- docker işlemleri
- Derleme, build komutları
- Dizin içeriğini listeleme (`ls`)
- Shell çalıştırması gerektiren diğer sistem komutları

**Kullanıma uygun değil:**
- Dosya okuma — Read kullanılmalıdır
- Dosya adı arama — Glob kullanılmalıdır
- Dosya içeriği arama — Grep kullanılmalıdır
- Dosya düzenleme — Edit kullanılmalıdır
- Dosya yazma — Write kullanılmalıdır
- Kullanıcıya bilgi çıktısı — doğrudan yanıt metninde çıktı verilmelidir
- Uzun süre çalışan işlemler (dev server, watch modu) — kullanıcının manuel çalıştırması önerilir

## Dikkat Edilecekler

- Boşluk içeren yollar çift tırnak ile sarılmalıdır
- 30000 karakteri aşan çıktılar kesilir
- Arka planda çalışan komutların sonuçları TaskOutput ile alınır
- Mümkün olduğunca mutlak yol kullanılmalı, `cd`'den kaçınılmalıdır
- Bağımsız komutlar paralel olarak birden fazla Bash çağrısıyla çalıştırılabilir
- Bağımlılığı olan komutlar `&&` ile zincirlenir
- Shell ortamı kullanıcının profilinden (bash veya zsh) başlatılır

## cc-viewer'da Önemi

Bash çağrıları istek günlüğünde `tool_use` (komutu içerir) ve `tool_result` (çıktıyı içerir) content block çifti olarak görünür. Komut çalıştırma çıktısı, modelin işlem davranışını analiz etmek için kullanılabilir.
