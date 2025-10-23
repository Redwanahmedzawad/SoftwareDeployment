import { onMounted, ref, computed } from 'vue';
import Toolbar from './components/Toolbar.vue';
import TaskForm from './components/TaskForm.vue';
import TaskFilters from './components/TaskFilters.vue';
import TaskStats from './components/TaskStats.vue';
import KanbanBoard from './components/KanbanBoard.vue';
import EditTaskModal from './components/EditTaskModal.vue';
import { Toaster, toast } from 'vue-sonner';
import { getTasks, createTask, updateTask, deleteTask } from './services/tasks';
const form = ref(null);
const tasks = ref([]);
const filters = ref({ query: '', status: 'all', priority: 'all' });
// EDIT state
const editOpen = ref(false);
const editingTask = ref(null);
function beginEdit(t) { editingTask.value = t; editOpen.value = true; }
async function saveEdit(fields) {
    if (!editingTask.value)
        return;
    const t = editingTask.value;
    const snapshot = { ...t };
    // merge changes locally first (optimistic)
    Object.assign(t, fields);
    try {
        // ✅ send priority as well
        await updateTask(t.id, {
            title: t.title,
            status: t.status,
            priority: t.priority, // <-- include this
        });
        toast.success('Changes saved');
    }
    catch (e) {
        // rollback on error & show real message
        Object.assign(t, snapshot);
        toast.error(e?.message || 'Save failed');
        console.error(e);
    }
    finally {
        editOpen.value = false;
    }
}
onMounted(async () => {
    try {
        tasks.value = await getTasks();
    }
    catch (e) {
        toast.error('Failed to load tasks');
        console.error(e);
    }
});
function applyFilters(source) {
    return source.filter(t => {
        if (filters.value.status !== 'all' && t.status !== filters.value.status)
            return false;
        if (filters.value.priority !== 'all' && (t.priority ?? 'medium') !== filters.value.priority)
            return false;
        if (filters.value.query && !t.title.toLowerCase().includes(filters.value.query.toLowerCase()))
            return false;
        return true;
    });
}
const todo = computed(() => applyFilters(tasks.value.filter(t => t.status === 'todo')));
const doing = computed(() => applyFilters(tasks.value.filter(t => t.status === 'doing')));
const done = computed(() => applyFilters(tasks.value.filter(t => t.status === 'done')));
async function handleAdd(payload) {
    const optimistic = { id: Date.now(), ...payload };
    tasks.value.unshift(optimistic);
    try {
        const created = await createTask({ title: payload.title, status: payload.status });
        const idx = tasks.value.findIndex(t => t.id === optimistic.id);
        if (idx >= 0)
            tasks.value[idx].id = created.id;
        toast.success('Task created');
    }
    catch (e) {
        tasks.value = tasks.value.filter(t => t.id !== optimistic.id);
        toast.error('Create failed');
        console.error(e);
    }
}
async function handleToggle(t) {
    const prev = t.status;
    t.status = t.status === 'done' ? 'todo' : 'done';
    try {
        await updateTask(t.id, { title: t.title, status: t.status });
        toast.success('Task updated');
    }
    catch (e) {
        t.status = prev;
        toast.error('Update failed');
        console.error(e);
    }
}
async function handleDelete(t) {
    const snapshot = tasks.value.slice();
    tasks.value = tasks.value.filter(x => x.id !== t.id);
    try {
        await deleteTask(t.id);
        toast.success('Task deleted');
    }
    catch (e) {
        tasks.value = snapshot;
        toast.error('Delete failed');
        console.error(e);
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({
    ...{ style: {} },
});
/** @type {[typeof Toolbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Toolbar, new Toolbar({
    ...{ 'onAdd': {} },
}));
const __VLS_1 = __VLS_0({
    ...{ 'onAdd': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ add: {} },
    { onAdd: (...[$event]) => {
            __VLS_ctx.form?.focus();
            // @ts-ignore
            [form,];
        } });
var __VLS_2;
/** @type {[typeof TaskForm, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(TaskForm, new TaskForm({
    ...{ 'onSubmit': {} },
    ref: "form",
}));
const __VLS_8 = __VLS_7({
    ...{ 'onSubmit': {} },
    ref: "form",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
const __VLS_12 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.handleAdd) });
/** @type {typeof __VLS_ctx.form} */ ;
var __VLS_13 = {};
// @ts-ignore
[form, handleAdd,];
var __VLS_9;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ style: {} },
});
/** @type {[typeof TaskFilters, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(TaskFilters, new TaskFilters({
    modelValue: (__VLS_ctx.filters),
}));
const __VLS_17 = __VLS_16({
    modelValue: (__VLS_ctx.filters),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
// @ts-ignore
[filters,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ style: {} },
});
/** @type {[typeof TaskStats, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(TaskStats, new TaskStats({
    total: (__VLS_ctx.tasks.length),
    done: (__VLS_ctx.tasks.filter(t => t.status === 'done').length),
}));
const __VLS_21 = __VLS_20({
    total: (__VLS_ctx.tasks.length),
    done: (__VLS_ctx.tasks.filter(t => t.status === 'done').length),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
// @ts-ignore
[tasks, tasks,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ style: {} },
});
/** @type {[typeof KanbanBoard, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(KanbanBoard, new KanbanBoard({
    ...{ 'onToggle': {} },
    ...{ 'onDelete': {} },
    ...{ 'onEdit': {} },
    todo: (__VLS_ctx.todo),
    doing: (__VLS_ctx.doing),
    done: (__VLS_ctx.done),
}));
const __VLS_25 = __VLS_24({
    ...{ 'onToggle': {} },
    ...{ 'onDelete': {} },
    ...{ 'onEdit': {} },
    todo: (__VLS_ctx.todo),
    doing: (__VLS_ctx.doing),
    done: (__VLS_ctx.done),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
let __VLS_27;
let __VLS_28;
const __VLS_29 = ({ toggle: {} },
    { onToggle: (__VLS_ctx.handleToggle) });
const __VLS_30 = ({ delete: {} },
    { onDelete: (__VLS_ctx.handleDelete) });
const __VLS_31 = ({ edit: {} },
    { onEdit: (__VLS_ctx.beginEdit) });
// @ts-ignore
[todo, doing, done, handleToggle, handleDelete, beginEdit,];
var __VLS_26;
/** @type {[typeof EditTaskModal, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(EditTaskModal, new EditTaskModal({
    ...{ 'onSave': {} },
    open: (__VLS_ctx.editOpen),
    task: (__VLS_ctx.editingTask),
}));
const __VLS_34 = __VLS_33({
    ...{ 'onSave': {} },
    open: (__VLS_ctx.editOpen),
    task: (__VLS_ctx.editingTask),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_36;
let __VLS_37;
const __VLS_38 = ({ save: {} },
    { onSave: (__VLS_ctx.saveEdit) });
// @ts-ignore
[editOpen, editingTask, saveEdit,];
var __VLS_35;
const __VLS_40 = {}.Toaster;
/** @type {[typeof __VLS_components.Toaster, ]} */ ;
// @ts-ignore
Toaster;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    richColors: true,
    position: "top-right",
}));
const __VLS_42 = __VLS_41({
    richColors: true,
    position: "top-right",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
// @ts-ignore
var __VLS_14 = __VLS_13;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
