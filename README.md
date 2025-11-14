# Лабораторная работа №6. Асинхронный JavaScript: API и хранилище

## Скриншоты работы интерактивных элементов

<img width="1903" height="912" alt="image" src="https://github.com/user-attachments/assets/7f0bb997-03aa-45a9-9282-7b4b2dd9f2c2" />

<img width="1898" height="910" alt="image" src="https://github.com/user-attachments/assets/e5beddf7-a40d-42e5-8ddc-28cf3deb25c3" />

<img width="1900" height="920" alt="image" src="https://github.com/user-attachments/assets/b7840abf-b761-4c64-888c-09445f1db882" />

<img width="1900" height="909" alt="image" src="https://github.com/user-attachments/assets/d3092d21-56ab-4da7-8cd7-e5167e319ab3" />

<img width="1899" height="915" alt="image" src="https://github.com/user-attachments/assets/56099d3a-7e1e-402f-90cf-cba91241b0b9" />

<img width="1895" height="912" alt="image" src="https://github.com/user-attachments/assets/329a5813-5c13-4a15-859b-fc83d70b36e2" />

## Ответы на вопросы

**1. Что делает fetch?**  
`fetch` позволяет отправлять HTTP-запросы к серверу и получать данные. Он возвращает **Promise**, который после выполнения содержит ответ от сервера.

**2. Зачем нужны async/await?**  
`async/await` упрощают работу с промисами. `async` делает функцию асинхронной, а `await` приостанавливает её выполнение до получения результата промиса, позволяя писать асинхронный код как синхронный.

**3. Как работает localStorage?**  
`localStorage` хранит данные в браузере в виде пар "ключ-значение". Эти данные сохраняются между перезагрузками страницы. Можно хранить только строки, поэтому объекты нужно сериализовать через `JSON.stringify()` и восстанавливать через `JSON.parse()`.

**4. Где помог ИИ, а где пришлось разбираться вручную?**  
- **ИИ помог:** написание кода для асинхронного получения отзывов с API, динамической подгрузки изображений и сохранения темы через localStorage.  
- **Разбирался вручную:** интеграция кода на страницу, корректное подключение элементов HTML и CSS, обработка кнопок навигации по отзывам.
