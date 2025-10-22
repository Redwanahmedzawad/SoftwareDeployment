import { computed } from "vue";
const props = defineProps();
const emit = defineEmits();
const columns = [
    { key: "todo", title: "To-Do" },
    { key: "doing", title: "Doing" },
    { key: "done", title: "Done" },
];
const byStatus = computed(() => ({
    todo: props.tasks.filter((t) => t.status === "todo"),
    doing: props.tasks.filter((t) => t.status === "doing"),
    done: props.tasks.filter((t) => t.status === "done"),
}));
function filtered(s) {
    return byStatus.value[s];
}
function emitUpdate(task) {
    emit("update", { ...task });
}
function emitDelete(id) {
    emit("delete", id);
}
function moveLeft(t) {
    const order = ["todo", "doing", "done"];
    const i = order.indexOf(t.status);
    if (i > 0) {
        t.status = order[i - 1];
        emitUpdate(t);
    }
}
function moveRight(t) {
    const order = ["todo", "doing", "done"];
    const i = order.indexOf(t.status);
    if (i < order.length - 1) {
        t.status = order[i + 1];
        emitUpdate(t);
    }
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
/** @type {__VLS_StyleScopedClasses['card__actions']} */ ;
/** @type {__VLS_StyleScopedClasses['card__actions']} */ ;
/** @type {__VLS_StyleScopedClasses['card__actions']} */ ;
/** @type {__VLS_StyleScopedClasses['card__actions']} */ ;
/** @type {__VLS_StyleScopedClasses['board']} */ ;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "board" },
});
for (const [col] of __VLS_getVForSourceType((__VLS_ctx.columns))) {
    // @ts-ignore
    [columns,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "col" },
        key: (col.key),
    });
    __VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
        ...{ class: "col__header" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
    (col.title);
    __VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
    (__VLS_ctx.filtered(col.key).length);
    // @ts-ignore
    [filtered,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
        ...{ class: "col__list" },
    });
    for (const [t] of __VLS_getVForSourceType((__VLS_ctx.filtered(col.key)))) {
        // @ts-ignore
        [filtered,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
            key: (t.id),
            ...{ class: "card" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card__title" },
            title: (t.title),
        });
        (t.title);
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "card__actions" },
        });
        if (col.key !== 'todo') {
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(col.key !== 'todo'))
                            return;
                        __VLS_ctx.moveLeft(t);
                        // @ts-ignore
                        [moveLeft,];
                    } },
                title: "Move left",
            });
        }
        if (col.key !== 'done') {
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(col.key !== 'done'))
                            return;
                        __VLS_ctx.moveRight(t);
                        // @ts-ignore
                        [moveRight,];
                    } },
                title: "Move right",
            });
        }
        __VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
            ...{ onChange: (...[$event]) => {
                    __VLS_ctx.emitUpdate(t);
                    // @ts-ignore
                    [emitUpdate,];
                } },
            value: (t.status),
            title: "Set status",
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
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    __VLS_ctx.emitDelete(t.id);
                    // @ts-ignore
                    [emitDelete,];
                } },
            ...{ class: "danger" },
            title: "Delete",
        });
    }
}
/** @type {__VLS_StyleScopedClasses['board']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col__header']} */ ;
/** @type {__VLS_StyleScopedClasses['col__list']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card__title']} */ ;
/** @type {__VLS_StyleScopedClasses['card__actions']} */ ;
/** @type {__VLS_StyleScopedClasses['danger']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
