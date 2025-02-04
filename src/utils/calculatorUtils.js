export const calculateResults = (initialWeight, finalWeight, totalFeed, days, unit) => {
  let weight1 = initialWeight;
  let weight2 = finalWeight;
  let feed = totalFeed;
  
  // ถ้าเป็นกรัม แปลงเป็น กก. เพื่อคำนวณ
  if (unit === 'g') {
    weight1 = initialWeight / 1000;
    weight2 = finalWeight / 1000;
    feed = totalFeed / 1000;
  }
  
  const fcr = feed / (weight2 - weight1);
  const adg = ((weight2 - weight1) / days) * (unit === 'g' ? 1000 : 1); // แปลงกลับเป็นกรัมถ้าต้องการ
  const fi = (feed / days) * (unit === 'g' ? 1000 : 1); // แปลงกลับเป็นกรัมถ้าต้องการ
  
  return { fcr, adg, fi, unit };
};
