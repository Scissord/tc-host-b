const formatDate = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  createdDate.setHours(createdDate.getHours() - 1);

  const isToday = now.toLocaleDateString('ru-RU', { timeZone: 'Asia/Almaty' }) === createdDate.toLocaleDateString('ru-RU', { timeZone: 'Asia/Almaty' });
  const isYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    .toLocaleDateString('ru-RU', { timeZone: 'Asia/Almaty' }) === createdDate.toLocaleDateString('ru-RU', { timeZone: 'Asia/Almaty' });

  if (isToday) {
    return createdDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Almaty' });
  } else if (isYesterday) {
    return `Вчр. ${createdDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Almaty' })}`;
  } else {
    return createdDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', timeZone: 'Asia/Almaty' });
  }
};

export default formatDate;
