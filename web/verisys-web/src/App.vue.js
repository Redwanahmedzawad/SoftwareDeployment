import { ref, onMounted } from "vue";
import KanbanBoard from "./components/KanbanBoard.vue";
import { listTasks, createTask, updateTask, deleteTask, } from "./services/tasks";
const tasks = ref([]);
const newTitle = ref("");
async function refresh() {
    tasks.value = await listTasks();
}
async function onAdd() {
    await createTask({ title: newTitle.value, status: "todo" });
    newTitle.value = "";
    await refresh();
}
async function onUpdate(task) {
    await updateTask(task);
    await refresh();
}
async function onDelete(id) {
    await deleteTask(id);
    await refresh();
}
onMounted(refresh);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['new']} */ ;
/** @type {__VLS_StyleScopedClasses['new']} */ ;
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({
    ...{ class: "app" },
});
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "app-header" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({});
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.onAdd) },
    ...{ class: "new" },
});
// @ts-ignore
[onAdd,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    placeholder: "Add a task...",
    required: true,
});
(__VLS_ctx.newTitle);
// @ts-ignore
[newTitle,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: "submit",
});
/** @type {[typeof KanbanBoard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(KanbanBoard, new KanbanBoard({
    ...{ 'onUpdate': {} },
    ...{ 'onDelete': {} },
    tasks: (__VLS_ctx.tasks),
    ...{ class: "app__board" },
}));
const __VLS_1 = __VLS_0({
    ...{ 'onUpdate': {} },
    ...{ 'onDelete': {} },
    tasks: (__VLS_ctx.tasks),
    ...{ class: "app__board" },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ update: {} },
    { onUpdate: (__VLS_ctx.onUpdate) });
const __VLS_6 = ({ delete: {} },
    { onDelete: (__VLS_ctx.onDelete) });
// @ts-ignore
[tasks, onUpdate, onDelete,];
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['app']} */ ;
/** @type {__VLS_StyleScopedClasses['app-header']} */ ;
/** @type {__VLS_StyleScopedClasses['new']} */ ;
/** @type {__VLS_StyleScopedClasses['app__board']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
