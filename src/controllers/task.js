import Task from '../models/task';



const add = async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }

}

const getAll = async (req, res) => {

    const match ={}
    const sort = {}

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]]=parts[1]==='desc' ? -1 : 1;
    }
    if(req.query.completed){
      match.completed =req.query.completed ==='true';
    }

    try {

        await req.user.populate({
            path:'tasks',
            match:match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort:sort
            }
        }).execPopulate()

        res.status(200).send(req.user.tasks)
    } catch (error) {
        res.status(500).send();
    }
}


const getById = async (req, res) => {

    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            res.status(404).send('Task cannot found');
        }
        res.status(200).send(task);

    } catch (error) {
        res.status(400).send(error)
    }

}

const updateTask = async (req, res) => {

    const id = req.params.id;
    const updates = Object.keys(req.body)
    const alloweUpdates = ['name', 'description', 'date', 'completed'];
    const isValidOperation = updates.every((update) => alloweUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send('Invalid update')
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        // const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!task) {
            res.status(404).send('Task cannot found')
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save();
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send('Server error  ocurred')
    }

}


const deleteTask = async (req, res) => {

    const id = req.params.id;


    try {
        const task = await Task.findByIdAndDelete({ _id: id, owner: req.user._id })

        if (!task) {
            res.status(404).send('Cannot found this task')
        }
        res.status(200).send('Task was remove')
    } catch (error) {
        res.status(500).send(error);

    }
}

const TaskController = {
    add, getAll, getById, updateTask, deleteTask
};


export default TaskController;