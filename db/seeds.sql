INSERT INTO department (name)
VALUES
  ('marketing department'),
  ('finance department'),
  ('operations department'),
  ('human resources department'),
  ('sales department'),
  ('purchase department'),
  


  INSERT INTO role (title, salary, department_id)
  VALUES
  ('manager', 70000, 4),
  ('sales associate', 30000, 2),
  ('human resource', 40000, 3),
  ('office manager', 20000, 4),
  ('scheduler', 15000, 5),
  



  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES
  ('Virginia', 'Woolf', 1, null),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 3, 1),
  ('Katherine', 'Mansfield', 4, 1),
  ('Dora', 'Carrington', 5, 1),
 