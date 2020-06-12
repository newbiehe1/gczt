import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
    slider: {
      html: '',
      show: false,
    },
    userData: {
      accountName: '用户名',
      menuVOList: [],
    },
    timer: {
      slider: null,
      tips: null,
    },
    systemName: '',
  },
  mutations: {
    // 切换 滑块显示状态
    toggleSlider (state, data) {
      if (data.state) {
        state.slider.html = '';
        state.slider.html = data.html;
      }
      state.slider.show = data.state;
    },
    // 赋值 用户数据
    setUserData (state, data) {
      if (data.menuVOList) {
        state.userData = JSON.parse(JSON.stringify(data));
      } else if (data.accountId) {
        Object.assign(state.userData, data);
      }
    },
    // 赋值系统名称
    setSystemName (state, name) {
      state.systemName = JSON.parse(JSON.stringify(name));
    },
    // 赋值 滑块时间对象
    setSliderTime (state, callback) {
      callback(state)
    },
    // 赋值 提示事件对象
    setTipsTime (state, callback) {
      callback(state)
    }
  },
  actions: {
    // 展示 滑块
    showSlider ({ dispatch, commit }, html) {
      // 初始化
      commit('setSliderTime', state => {
        if (state.timer.slider)
          clearTimeout(state.timer.slider);
      })
      // 时长
      const duration = 2000;

      commit('toggleSlider', { state: true, html: JSON.parse(JSON.stringify(html)) });
      commit('setSliderTime', state => {
        state.timer.slider = setTimeout(() => {
          dispatch('hideSlider');
          clearTimeout(state.timer.slider);
        }, duration);
      })

    },
    // 隐藏滑块
    hideSlider ({ commit }) {
      commit('setSliderTime', state => {
        clearTimeout(state.timer.slider);
      })
      commit('toggleSlider', { state: false, html: '' });
    },
    // 赋值用户名数据
    setUserData ({ commit }, data) {
      if (data.accountName) {
        commit('setUserData', data);
      }
    },
    // 赋值系统名称
    setSystemName ({ commit }, name) {
      if (name)
        commit('setSystemName', name);
    },
  },
})