import { ref, nextTick } from 'vue';
import Button from './ui/Button.vue';
const emit = defineEmits();
const title = ref('');
const status = ref('todo');
const priority = ref('medium');
const titleEl = ref(null);
function focus() { titleEl.value?.focus(); }
const __VLS_exposed = { focus };
defineExpose(__VLS_exposed);
function onSubmit() {
    if (!title.value.trim())
        return;
    emit('submit', {
        title: title.value.trim(),
        status: status.value,
        priority: priority.value,
    });
    title.value = '';
    nextTick(() => titleEl.value?.focus());
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.onSubmit) },
    ...{ class: "u-grid u-grid-gap" },
});
// @ts-ignore
[onSubmit,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    ref: "titleEl",
    ...{ class: "input" },
    placeholder: "Task title",
});
(__VLS_ctx.title);
/** @type {typeof __VLS_ctx.titleEl} */ ;
// @ts-ignore
[title, titleEl,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-flex u-gap-3" },
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    ...{ class: "input" },
    value: (__VLS_ctx.status),
});
// @ts-ignore
[status,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "todo",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "doing",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "done",
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    ...{ class: "input" },
    value: (__VLS_ctx.priority),
});
// @ts-ignore
[priority,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({});
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Button, new Button({
    type: "submit",
}));
const __VLS_1 = __VLS_0({
    type: "submit",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
const { default: __VLS_3 } = __VLS_2.slots;
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['u-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid-gap']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['u-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['u-gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
});
export default {};
