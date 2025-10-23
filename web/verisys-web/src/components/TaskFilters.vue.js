const model = defineModel({
    default: { query: '', status: 'all', priority: 'all' }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaultModels = {
    'modelValue': { query: '', status: 'all', priority: 'all' },
};
const __VLS_modelEmit = defineEmits();
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
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-grid u-grid-gap" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ class: "input" },
    placeholder: "Search tasks…",
});
(__VLS_ctx.model.query);
// @ts-ignore
[model,];
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    ...{ class: "input" },
    value: (__VLS_ctx.model.status),
});
// @ts-ignore
[model,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "all",
});
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
    value: (__VLS_ctx.model.priority),
});
// @ts-ignore
[model,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "all",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "low",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "medium",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "high",
});
/** @type {__VLS_StyleScopedClasses['u-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid-gap']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
