import TaskCard from './TaskCard.vue';
const props = defineProps();
const emit = defineEmits();
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
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-grid u-grid-gap" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "u-text-muted" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-grid u-grid-auto u-grid-gap" },
});
for (const [t] of __VLS_getVForSourceType((props.todo))) {
    /** @type {[typeof TaskCard, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(TaskCard, new TaskCard({
        ...{ 'onToggle': {} },
        ...{ 'onDelete': {} },
        ...{ 'onEdit': {} },
        key: (t.id),
        title: (t.title),
        status: (t.status),
        priority: (t.priority ?? 'medium'),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onToggle': {} },
        ...{ 'onDelete': {} },
        ...{ 'onEdit': {} },
        key: (t.id),
        title: (t.title),
        status: (t.status),
        priority: (t.priority ?? 'medium'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = ({ toggle: {} },
        { onToggle: (...[$event]) => {
                __VLS_ctx.emit('toggle', t);
                // @ts-ignore
                [emit,];
            } });
    const __VLS_6 = ({ delete: {} },
        { onDelete: (...[$event]) => {
                __VLS_ctx.emit('delete', t);
                // @ts-ignore
                [emit,];
            } });
    const __VLS_7 = ({ edit: {} },
        { onEdit: (...[$event]) => {
                __VLS_ctx.emit('edit', t);
                // @ts-ignore
                [emit,];
            } });
    var __VLS_2;
}
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "u-text-muted" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-grid u-grid-auto u-grid-gap" },
});
for (const [t] of __VLS_getVForSourceType((props.doing))) {
    /** @type {[typeof TaskCard, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(TaskCard, new TaskCard({
        ...{ 'onToggle': {} },
        ...{ 'onDelete': {} },
        ...{ 'onEdit': {} },
        key: (t.id),
        title: (t.title),
        status: (t.status),
        priority: (t.priority ?? 'medium'),
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onToggle': {} },
        ...{ 'onDelete': {} },
        ...{ 'onEdit': {} },
        key: (t.id),
        title: (t.title),
        status: (t.status),
        priority: (t.priority ?? 'medium'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    const __VLS_14 = ({ toggle: {} },
        { onToggle: (...[$event]) => {
                __VLS_ctx.emit('toggle', t);
                // @ts-ignore
                [emit,];
            } });
    const __VLS_15 = ({ delete: {} },
        { onDelete: (...[$event]) => {
                __VLS_ctx.emit('delete', t);
                // @ts-ignore
                [emit,];
            } });
    const __VLS_16 = ({ edit: {} },
        { onEdit: (...[$event]) => {
                __VLS_ctx.emit('edit', t);
                // @ts-ignore
                [emit,];
            } });
    var __VLS_11;
}
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "u-text-muted" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-grid u-grid-auto u-grid-gap" },
});
for (const [t] of __VLS_getVForSourceType((props.done))) {
    /** @type {[typeof TaskCard, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(TaskCard, new TaskCard({
        ...{ 'onToggle': {} },
        ...{ 'onDelete': {} },
        ...{ 'onEdit': {} },
        key: (t.id),
        title: (t.title),
        status: (t.status),
        priority: (t.priority ?? 'medium'),
    }));
    const __VLS_19 = __VLS_18({
        ...{ 'onToggle': {} },
        ...{ 'onDelete': {} },
        ...{ 'onEdit': {} },
        key: (t.id),
        title: (t.title),
        status: (t.status),
        priority: (t.priority ?? 'medium'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_21;
    let __VLS_22;
    const __VLS_23 = ({ toggle: {} },
        { onToggle: (...[$event]) => {
                __VLS_ctx.emit('toggle', t);
                // @ts-ignore
                [emit,];
            } });
    const __VLS_24 = ({ delete: {} },
        { onDelete: (...[$event]) => {
                __VLS_ctx.emit('delete', t);
                // @ts-ignore
                [emit,];
            } });
    const __VLS_25 = ({ edit: {} },
        { onEdit: (...[$event]) => {
                __VLS_ctx.emit('edit', t);
                // @ts-ignore
                [emit,];
            } });
    var __VLS_20;
}
/** @type {__VLS_StyleScopedClasses['u-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid-gap']} */ ;
/** @type {__VLS_StyleScopedClasses['u-text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid-gap']} */ ;
/** @type {__VLS_StyleScopedClasses['u-text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid-gap']} */ ;
/** @type {__VLS_StyleScopedClasses['u-text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['u-grid-gap']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
