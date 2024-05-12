export function filter() {

  document.addEventListener('DOMContentLoaded', function() {    

      const allCheckbox = document.getElementById('all');             
      allCheckbox.checked = true;                                       
      filterBlocks();                                                   
    
    });
    
    const checkboxes = document.querySelectorAll('.category-checkbox');       
    
    //------ Event on checkbox.
    
    checkboxes.forEach(checkbox => {                                       
      checkbox.addEventListener('change', function() {                      
        uncheckFilter(checkbox);                                  
      })
    })
    
    checkboxes.forEach(checkbox => {                                  
      checkbox.addEventListener('change', function() {                     
      filterBlocks();                                                 
      });
    });
    
    //------ Filter the blocks
    
    
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
    
    
    //------ Uncheck specific filters if ALL is checked and vice-versa.
    
    function uncheckFilter(checkbox) {
      if (checkbox.id==='all' && checkbox.checked) {                                          
    
        checkboxes.forEach (box => {                                                
    
          if (box !== checkbox) {                                                          
          }
    
        });
      } else if (checkbox.id!== 'all' && checkbox.checked) {                                   
          const uncheck = document.getElementById('all');                                 
          uncheck.checked = false;                                                               
      }
    }
    

}