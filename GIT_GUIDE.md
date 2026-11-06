# 🔀 Робота з Git

## Коміт змін

```bash
# Перевіривайте статус
git status

# Додайте всі файли
git add .

# Коміт з описом
git commit -m "refactor: переробка інтерфейсу з новим дизайном

- Додано 6 нових компонентів (Header, Dashboard, PhonesList, etc)
- Реалізована аналітика з 6 показниками
- Додано сортування за 5 критеріями
- Покращена адаптивність для всіх пристроїв
- Оновлено стилі з градієнтами та анімаціями
- Додано редагування телефонів з модалі
- Вся функціональність збережена"

# Відправте на GitHub
git push origin main
```

## Гілки

```bash
# Переглядіть поточну гілку
git branch

# Створіть нову гілку для функцій
git checkout -b feature/new-feature

# Поверніться на main
git checkout main

# Видаліть локальну гілку
git branch -d feature/new-feature
```

## Історія комітів

```bash
# Переглядіть останні 10 комітів
git log --oneline -10

# Більш детальна інформація
git log --pretty=format:"%h - %an, %ar : %s"

# Графік гілок
git log --graph --all --decorate --oneline
```

## Скасування змін

```bash
# Скасувати останній локальний коміт (файли залишаються)
git reset --soft HEAD~1

# Скасувати останній коміт з видаленням файлів
git reset --hard HEAD~1

# Скасувати зміни в файлі
git checkout -- src/components/App.jsx

# Видалити незабезпечені зміни
git clean -fd
```

## Синхронізація з віддаленим сховищем

```bash
# Отримайте останні зміни
git fetch origin

# Злиття найнових змін у вашу гілку
git pull origin main

# Відправте вашу гілку
git push origin main

# Встановіть вгору по потоці
git push --set-upstream origin feature/new-feature
```

## Pull Request (PR)

1. Создайте гілку для функції
2. Зробіть коміти
3. Відправте гілку на GitHub
4. Відкрийте PR на GitHub.com
5. Заповніть описання
6. Чекайте перегляду
7. Об'єднайте в main

## Конфлікти

```bash
# Переглядіть конфлікти
git status

# Вручну виправте файли, потім:
git add .
git commit -m "resolve: merged conflicts"
git push origin branch-name
```

## Теги версій

```bash
# Створіть тег
git tag v1.0.0

# Додайте повідомлення до тагу
git tag -a v1.0.0 -m "Version 1.0.0 - UI Redesign"

# Відправте теги
git push origin v1.0.0

# Відправте всі теги
git push origin --tags

# Переглядіть теги
git tag -l
```

---

## 📋 Шаблон коміту

```
<type>: <subject>

<body>

<footer>
```

### Типи:
- **feat**: нова функція
- **fix**: виправлення помилки
- **refactor**: переробка коду
- **style**: стилі (CSS)
- **docs**: документація
- **chore**: управління, конфігурація
- **perf**: продуктивність
- **test**: тести

### Приклад:

```
feat: додано компонент Dashboard

- Додано 6 карток зі статистикою
- Реалізовані розрахунки прибутків
- Додана кольорова кодування

Closes #123
```

---

## 🚀 Робочий потік

### 1. Розробка нової функції

```bash
git checkout main
git pull origin main
git checkout -b feature/my-feature
# ... Пишемо код ...
git add .
git commit -m "feat: опис функції"
git push origin feature/my-feature
```

### 2. Рецензія та об'єднання

```bash
# На GitHub.com:
# 1. Відкрийте Pull Request
# 2. Опишіть зміни
# 3. Чекайте рецензії
# 4. Об'єднайте в main
```

### 3. Видалення гілки

```bash
git checkout main
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

---

## 🆘 Часті помилки

### "Дані які не були поставлені"

```bash
# Перевіривайте де ви сейчас
git status
git branch

# Переконайтесь що ви на правильній гілці
git checkout main
```

### "Permission denied"

```bash
# Виправте SSH ключі
ssh -T git@github.com

# Або використайте HTTPS
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

### "Конфлікти при Merge"

```bash
# Розв'яжіть конфлікти в редакторі
# Потім:
git add .
git commit -m "resolve: merge conflicts"
git push
```

---

## 📊 Корисні команди

```bash
# Статус проекту
git status
git log
git diff

# Информація про автора
git config user.name
git config user.email

# Глобальні налаштування
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Алісаси для швидкості
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
```

---

**Успішної розробки! 🚀**
