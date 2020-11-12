-- select employee id, first name, last name, sex and salary
SELECT employees.employee_id, employees.first_name, employees.last_name, employees.sex, salaries.salary
FROM employees, salaries
WHERE employees.employee_id = salaries.employee_id;

-- select employees hired in 1986
SELECT first_name, last_name, hire_date
FROM employees
WHERE hire_date BETWEEN '1986-01-01' AND '1986-12-31';
 


--Manager of each department with dept name and employee information
SELECT dept_manager.dept_no, departments.dept_name, employees.employee_id, employees.first_name, employees.last_name 
FROM employees
JOIN dept_manager
ON dept_manager.employee_id = employees.employee_id
JOIN departments
ON dept_manager.dept_no = departments.dept_no;

--employee information and department name 
SELECT departments.dept_no, employees.employee_id, employees.first_name, employees.last_name, departments.dept_name
FROM employees 
JOIN dept_emp_junction 
ON employees.employee_id = dept_emp_junction.employee_id
JOIN departments 
ON departments.dept_no = dept_emp_junction.dept_no;


--employees named Hercules with last name starting with B
SELECT first_name, last_name, sex
FROM employees
WHERE first_name = 'Hercules' AND last_name LIKE 'B%';

--employees in the sales department
SELECT employees.employee_id, employees.last_name, employees.first_name, departments.dept_name
FROM employees 
JOIN dept_emp_junction 
ON employees.employee_id = dept_emp_junction.employee_id
JOIN departments 
ON departments.dept_no = dept_emp_junction.dept_no
WHERE departments.dept_no = 'd007';


--employees in the sales department and the development department
SELECT employees.employee_id, employees.last_name, employees.first_name, departments.dept_name
FROM employees 
JOIN dept_emp_junction 
ON employees.employee_id = dept_emp_junction.employee_id
JOIN departments 
ON departments.dept_no = dept_emp_junction.dept_no
WHERE departments.dept_no = 'd007' OR departments.dept_no = 'd005';

SELECT last_name, COUNT(last_name) AS "Last Name Count"
FROM employees
GROUP BY last_name
ORDER BY "last_name" DESC;





