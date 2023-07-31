# Init frontend
<pre>
> cd frontend
> npm i
</pre>

# Init server
<pre>
> cd server
> npm i
</pre>

# Run frontend
<pre>
> cd frontend
> npm run start
</pre>

# Run server
<pre>
> cd server
> npm run start
</pre>

# Merging
All tasks will be merge into <i>develop</i><br>
Before starting a task, create branch and push it to github like this:
<pre>
git checkout develop
git branch [task/(task_name)]
git checkout [task/(task_name)] <-- here you checkout the branch you created
git push -u origin [task/(task_name)]
</pre>
You can always merge develop into your task branch, to get the latest updates<br>
After you're done with the task, ask the admin (Cristian) to change the task status to <i>Pull Request</i> and to merge it into develop
David may also merge tasks into develop

# Tasks
(nr). [Frontend | Backend]: (task name) | <b>[Declared | Doing | Icebox | Pull Request | Done]</b><br>
- To view the latest version of this file, checkout to the latest master commit
- Only the admin (Cristian) can change the statuses
- Task request are welcomed
## Cristian
<pre>
1. Backend:  Setup the server     | <b>Done</b>
2. Backend:  Setup the db         | <b>Declared</b>
3. Backend:  Write the Auth API   | <b>Done</b>
4. Frontend: Setup axios Auth API | <b>Doing</b>
5. Frontend: Setup the frontend   | <b>Done</b>
...
</pre>

## David
<pre>
1. Frontend: Design the Post component | <b>Doing</b>
2. Frontend: Design the Main page      | <b>Doing</b>
3. Backend:  Implement the Post model  | <b>Declared</b>
...
</pre>
## Calin
<pre>
1. Frontend: Design and develop the Log In page | <b>Doing</b>
2. Backend: Design the Post model               | <b>Declared</b>
...
</pre>