INSERT INTO department (name)
VALUES
  ('marketing department'); 
  ('finance department'); 
  ('operations department'); 
  ('human resources dpartment'); 
  ('sales department'); 
  ('purchase department'); 
  


  INSERT INTO roles (title,salary,department_id)
  VALUES
  ('manager', 70,000, 4); 
  ('sales associate', 30,000, 2); 
  ('human resource', 40,000, 3); 
  ('office manager', 20,000, 4); 
  ('scheduler', 15,000, 5); 




  INSERT INTO employees (first_name,last_name,role_id,manager_id)
  VALUES
  ('Virginia', 'Woolf', 1),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 3, 1),
  ('Katherine', 'Mansfield', 4, 1),
  ('Dora', 'Carrington', 5, 1),
 