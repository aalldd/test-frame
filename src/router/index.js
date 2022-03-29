import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'root',
            component: () => import('../views/CesiumView'),
            children: [{
                path: '/flood',
                name: 'flood',
                component: () => import('../components/analysis/FloodAna')
            },
                {
                    path: '/cutfill',
                    name: 'cutfill',
                    component: () => import('../components/analysis/CutFillAna')
                },
                {
                    path: '/dynacut',
                    name: 'dynacut',
                    component: () => import('../components/analysis/DynacutAna')
                },
                {
                    path: '/flow',
                    name: 'flow',
                    component: () => import('../components/analysis/FlowAna')
                },
                {
                    path: '/roll',
                    name: 'roll',
                    component: () => import('../components/analysis/RollAna')
                },
                {
                    path: '/squib',
                    name: 'squib',
                    component: () => import('../components/analysis/SquibAna')
                },
                {
                    path: '/tunnel',
                    name: 'tunnel',
                    component: () => import('../components/analysis/TunnelAna')
                },
                {
                    path: '/conditionQuery',
                    name: 'conditionQuery',
                    component: () => import('../components/query/ConditionQueryAna')
                },
                {
                    path: '/quickQuery',
                    name: 'quickQuery',
                    component: () => import('../components/query/QuickQueryAna')
                },
                {
                    path: '/autoRoam',
                    name: 'autoRoam',
                    component: () => import('../components/roam/AutoRoam')
                },
                {
                    path: '/fixedRoam',
                    name: 'fixedRoam',
                    component: () => import('../components/roam/FixedRoam')
                },
                {
                    path: '/pipelineStatistic',
                    name: 'pipelineStatistic',
                    component: () => import('../components/statistic/PipeLineStatistic')
                },
                {
                    path: '/pipePointStatistic',
                    name: 'pipePointStatistic',
                    component: () => import('../components/statistic/PipePointStatistic')
                },
                {
                    path: '/horvercut',
                    name: 'horvercut',
                    component: () => import('../components/analysis/HorAndVerAna')
                }, {
                    path: '/connection',
                    name: 'connection',
                    component: () => import('../components/analysis/ConnectionAna')
                }, {
                    path: '/fence',
                    name: 'fence',
                    component: () => import('../components/analysis/FenceAna')
                }
            ]
        },
        {
            path: '/linkage-page',
            name: 'linkage-page',
            component: () => import('../components/link/linkage')
        }
    ],

});

export default router;
