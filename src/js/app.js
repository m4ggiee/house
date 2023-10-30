let building = {
  flats: [],
};

function displayData() {
  document.getElementById('data').innerHTML = JSON.stringify(building, null, 2);
}

document.getElementById('buildingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const flats = document.getElementById('flats').value;
  
  if(!flats) {
    alert('Будь ласка, введіть кількість квартир');
    return;
  }
  
  for(let i=0; i<flats; i++) {
    const form = document.createElement('form');
    form.innerHTML = `
      <h2>Форма для додавання квартири ${i+1}</h2>
      <label for="residents${i}">Кількість мешканців:</label><br>
      <input type="number" id="residents${i}" name="residents" required><br>
      <input type="submit" value="Створити квартиру">
    `;
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const residents = document.getElementById(`residents${i}`).value;
      
      if(!residents) {
        alert(`Будь ласка, введіть кількість мешканців для квартири ${i+1}`);
        return;
      }
      
      const flat = {
        flatNumber: i+1,
        residents: [],
      };
      
      for(let j=0; j<residents; j++) {
        const name = prompt(`Введіть ім'я мешканця ${j+1} для квартири ${i+1}`);
        
        if(!name) {
          alert(`Будь ласка, введіть ім'я мешканця ${j+1} для квартири ${i+1}`);
          return;
        }
        
        flat.residents.push({name});
      }
      
      building.flats.push(flat);
      
      form.style.display = 'none';
      
      if(building.flats.length == flats) {
        document.getElementById('displayButton').style.display = 'block';
        displayData(); 
      }
    });
    
    document.getElementById('flatForms').appendChild(form);
  }
  
  document.getElementById('buildingForm').style.display = 'none';
});
