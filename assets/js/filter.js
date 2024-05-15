export function filter() {
  document.addEventListener('DOMContentLoaded', function() {    
    const allCheckbox = document.getElementById('all');
    const checkboxes = document.querySelectorAll('.category-checkbox'); // Define checkboxes here
    
    let otherCheckboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked && checkbox.id !== 'all');
    if (!otherCheckboxChecked) {
      allCheckbox.checked = true;
    }
    
    filterBlocks(); 
    
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        uncheckFilter(checkbox, checkboxes); // Pass checkboxes array to uncheckFilter
        filterBlocks();
      });
    });
  });
  
  function filterBlocks() {
    const checkedCategories = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(checkbox => checkbox.id);
    const blocks = document.querySelectorAll('.block');
    
    blocks.forEach(block => {
      const category = block.getAttribute('id');
      if (checkedCategories.includes(category) || checkedCategories.includes('all')) {
        block.style.display = 'block';
        const taskBlocks = document.querySelector('.taskBlocks');
        taskBlocks.style.justifyContent = 'space-around';
      } else {
        block.style.display = 'none';
      }
    });
  }
  
  function uncheckFilter(checkbox, checkboxes) { // Pass checkboxes array as argument
    const allCheckbox = document.getElementById('all');
    if (checkbox.id === 'all' && checkbox.checked) {
      checkboxes.forEach(box => {
        if (box !== checkbox) {
          box.checked = false;
        }
      });
    } else if (checkbox.id !== 'all' && checkbox.checked) {
      allCheckbox.checked = false;
    } else if (checkbox.id === 'all' && !checkbox.checked) {
      checkboxes.forEach(box => {
        box.checked = false;
      });
    }
  }
}
